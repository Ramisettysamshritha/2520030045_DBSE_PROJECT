const express = require("express");

const {
  createBooking,
  getMyBookings,
  getBookingById,
  cancelBooking
} = require("../controllers/bookingsController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createBooking);

router.get("/my", getMyBookings);

router.get("/:id", getBookingById);

router.put("/:id/cancel", cancelBooking);

module.exports = router;