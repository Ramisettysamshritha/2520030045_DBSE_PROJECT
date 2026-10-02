const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// ==========================================
// MYSQL DATABASE CONNECTION
// ==========================================

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "12345",
  database: process.env.DB_NAME || "travel_package_portal",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


// ==========================================
// JWT SECRET
// ==========================================

const JWT_SECRET =
  process.env.JWT_SECRET || "travel_package_portal_secret_2026";


// ==========================================
// JWT VERIFICATION MIDDLEWARE
// ==========================================

function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization token required"
      });
    }

    const parts = authHeader.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format"
      });
    }

    const token = parts[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
}


// ==========================================
// HOME
// ==========================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    service: "Booking Microservice",
    message: "Booking Service is running"
  });
});


// ==========================================
// HEALTH CHECK
// ==========================================

app.get("/health", async (req, res) => {
  try {

    await db.query("SELECT 1");

    res.json({
      success: true,
      service: "Booking Microservice",
      database: "connected"
    });

  } catch (error) {

    console.error("Health Check Error:", error.message);

    res.status(500).json({
      success: false,
      service: "Booking Microservice",
      database: "disconnected",
      error: error.message
    });

  }
});


// ==========================================
// GET USER BOOKINGS
// ==========================================

app.get("/bookings", verifyToken, async (req, res) => {

  try {

    const [bookings] = await db.query(
      `SELECT
        booking_id,
        booking_code,
        booking_date,
        travel_date,
        total_amount,
        booking_status
       FROM bookings
       WHERE user_id = ?
       ORDER BY booking_date DESC`,
      [req.user.user_id]
    );

    res.json({
      success: true,
      count: bookings.length,
      bookings: bookings
    });

  } catch (error) {

    console.error("Get Bookings Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message
    });

  }

});


// ==========================================
// START SERVER
// ==========================================

const PORT = 5002;

app.listen(PORT, async () => {

  console.log("==========================================");
  console.log("       BOOKING MICROSERVICE");
  console.log("==========================================");

  console.log(
    `Booking Service running on: http://localhost:${PORT}`
  );

  try {

    const connection = await db.getConnection();

    console.log("MySQL database connected successfully");

    connection.release();

  } catch (error) {

    console.error("MySQL connection failed:");
    console.error(error.message);

  }

});