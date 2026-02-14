const mongoose = require('mongoose');

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Database")
    } catch (error) {
        console.log("Error connecting to Database", error)
    }
    
}

module.exports = connectDB;