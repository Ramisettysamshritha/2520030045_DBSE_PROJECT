const express = require("express");

const {
  getAllUsers,
  getAllBookings,
  updateUserRole,
  deleteUser,
  getDashboardStats
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/dashboard", getDashboardStats);

router.get("/users", getAllUsers);

router.get("/bookings", getAllBookings);

router.put("/users/:id/role", updateUserRole);

router.delete("/users/:id", deleteUser);

module.exports = router;