const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { otpLimiter } = require('../middlewares/rateLimiter');
/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     summary: Send OTP to email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 */

router.post('/send-otp', otpLimiter, authController.sendOtp);
router.post('/send-otp', authController.sendOtp);
/**
 * @swagger
/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     summary: Verify OTP and get JWT tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@gmail.com
 *               otp:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: OTP verified successfully
 */


router.post('/verify-otp', authController.verifyOtp);


module.exports = router;
