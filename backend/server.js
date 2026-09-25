const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const busRoutes = require("./routes/busRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const packageRoutes = require("./routes/packageRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const reportRoutes = require("./routes/reportRoutes");
const pricingRoutes = require("./routes/pricingRoutes");
const vendorRoutes = require("./routes/vendorRoutes");
const app = express();

app.use(cors());
app.use(express.json());

/* =========================
   BASIC ROUTES
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Travel Package Booking Portal Backend is running"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is healthy"
  });
});

app.get("/api/db-test", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT 1 AS connection_test"
    );

    res.json({
      success: true,
      message: "MySQL database connected successfully",
      data: rows
    });
  } catch (error) {
    console.error("Database Error:", error.message);

    res.status(500).json({
      success: false,
      message: "MySQL database connection failed",
      error: error.message
    });
  }
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);

app.use("/api/destinations", destinationRoutes);

app.use("/api/hotels", hotelRoutes);

app.use("/api/buses", busRoutes);

app.use("/api/restaurants", restaurantRoutes);

app.use("/api/packages", packageRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/reviews", reviewRoutes);

app.use("/api/users", userRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/reports", reportRoutes);

app.use("/api/pricing", pricingRoutes);

app.use("/api/vendors", vendorRoutes);

/* =========================
   404
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found"
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error"
  });
});

/* =========================
   START SERVER
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log("==========================================");
  console.log(" Travel Package Booking Portal Backend");
  console.log("==========================================");
  console.log(`Server running on: http://localhost:${PORT}`);

  try {
    const connection = await db.getConnection();

    console.log("MySQL database connected successfully");

    connection.release();
  } catch (error) {
    console.error("MySQL connection failed:");
    console.error(error.message);
  }
});