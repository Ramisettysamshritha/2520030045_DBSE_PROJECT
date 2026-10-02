const express = require("express");

const {
  getMyProfile,
  updateMyProfile
} = require("../controllers/usersController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/me", getMyProfile);

router.put("/me", updateMyProfile);

module.exports = router;