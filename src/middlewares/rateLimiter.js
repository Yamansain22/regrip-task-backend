const rateLimit = require('express-rate-limit');

// General API limiter
exports.apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests. Please try again later."
  }
});

// Strict OTP limiter
exports.otpLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // max 5 OTP per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many OTP requests. Try again after 1 hour."
  }
});
