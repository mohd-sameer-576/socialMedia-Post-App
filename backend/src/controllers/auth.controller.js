const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function registerUser(req,res) {
    const { username, email, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await userModel.create({ username, email, password });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        await user.save();
        res.status(201).json({ message: "User registered successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}

async function loginUser(req,res) {
    const { email, password } = req.body;
    try {
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: "Login successful", user, token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
}

async function logoutUser(req,res) {
    res.clearCookie('token');
    res.status(200).json({ message: "Logout successful" });
}
module.exports = {
    registerUser,
    loginUser,
    logoutUser  
};