const pool = require('../config/db');
const generateOtp = require('../utils/generateOtp');
const sendEmail = require('../utils/sendEmail');
const jwt = require('jsonwebtoken');

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  try {exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP required" });
  }

  try {
    const [otpRecords] = await pool.query(
      "SELECT * FROM otps WHERE email = ? ORDER BY id DESC LIMIT 1",
      [email]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ message: "No OTP found" });
    }

    const record = otpRecords[0];

    if (record.attempts >= 5) {
      return res.status(429).json({ message: "Too many attempts. Request new OTP." });
    }

    if (record.otp !== otp) {
      await pool.query(
        "UPDATE otps SET attempts = attempts + 1 WHERE id = ?",
        [record.id]
      );
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    let userId;

    if (users.length === 0) {
      const [result] = await pool.query(
        "INSERT INTO users (email, is_verified) VALUES (?, ?)",
        [email, true]
      );
      userId = result.insertId;
    } else {
      userId = users[0].id;
    }

    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    // Log activity
    await pool.query(
      "INSERT INTO activity_logs (user_id, action, ip_address) VALUES (?, ?, ?)",
      [userId, "User logged in via OTP", req.ip]
    );

    // Delete OTP after use
    await pool.query("DELETE FROM otps WHERE email = ?", [email]);

    res.json({
      message: "OTP verified successfully",
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

    const [otpRecords] = await pool.query(
      "SELECT * FROM otps WHERE email = ? ORDER BY id DESC LIMIT 1",
      [email]
    );

    if (otpRecords.length === 0) {
      return res.status(400).json({ message: "No OTP found" });
    }

    const record = otpRecords[0];

    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (new Date() > record.expires_at) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Check if user exists
    const [users] = await pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    let userId;

    if (users.length === 0) {
      const [result] = await pool.query(
        "INSERT INTO users (email, is_verified) VALUES (?, ?)",
        [email, true]
      );
      userId = result.insertId;
    } else {
      userId = users[0].id;
    }

    // Generate tokens
    const accessToken = jwt.sign(
      { userId },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "OTP verified successfully",
      accessToken,
      refreshToken
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Verification failed" });
  }
};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

    await pool.query(
      "INSERT INTO otps (email, otp, expires_at) VALUES (?, ?, ?)",
      [email, otp, expiresAt]
    );

    await sendEmail(email, otp);

    res.json({ message: "OTP sent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};
