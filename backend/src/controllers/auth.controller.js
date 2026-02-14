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
        await user.save();
        res.status(201).json({ message: "User registered successfully", user, token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}

module.exports = {
    registerUser,
};