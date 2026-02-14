const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: (v) => emailRegex.test(v),
            message: "Invalid email format"
        }
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);

});
const userModel = mongoose.model('user', userSchema)

module.exports = userModel;