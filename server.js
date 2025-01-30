const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for error handling
app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
});

// /ping route with error handling
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
    console.log(`Server is running on port ${PORT}`);
});
