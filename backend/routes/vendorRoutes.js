const express = require("express");

const {
  getAllVendors,
  createVendor,
  updateVendor,
  deleteVendor
} = require("../controllers/vendorController");

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", getAllVendors);

router.post("/", createVendor);

router.put("/:id", updateVendor);

router.delete("/:id", deleteVendor);

module.exports = router;