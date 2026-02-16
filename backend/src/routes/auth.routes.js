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
router.get("/profile", authMiddleware, (req, res) => {
  // req.user is usually set by your authMiddleware after verifying the token
  if (req.user) {
    res.json({ user: req.user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});
module.exports = router;