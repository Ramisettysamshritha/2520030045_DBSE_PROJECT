const express = require("express");

const {
  getSalesSummary,
  getSalesByPackage,
  getMonthlySales,
  getBookingStatusReport
} = require("../controllers/reportController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/summary", getSalesSummary);

router.get("/packages", getSalesByPackage);

router.get("/monthly", getMonthlySales);

router.get("/booking-status", getBookingStatusReport);

module.exports = router;