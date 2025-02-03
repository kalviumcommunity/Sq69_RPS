require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO__URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Failed:", err.message));

// Middleware for error handling
app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
});

// Home route - Show MongoDB connection status
app.get("/", (req, res) => {
    const status = mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    res.json({ database: status });
});

// /ping route
app.get("/ping", (req, res, next) => {
    try {
        res.status(200).json({ message: "pong" });
    } catch (error) {
        next(error);
    }
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);

});
