const express = require('express');
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/authmiddleware');
const router = express.Router();

router.post('/register-user', authController.registerUser)

router.post('/login-user', authController.loginUser)
router.post('/logout-user', authController.logoutUser)
router.get('/me', authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

module.exports = router;