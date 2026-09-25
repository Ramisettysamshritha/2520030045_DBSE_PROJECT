const express = require("express");

const {
  getAllPackages,
  getPackageById,
  searchPackages,
  createPackage,
  updatePackage,
  deletePackage
} = require("../controllers/packagesController");

const router = express.Router();

router.get("/search", searchPackages);
router.get("/", getAllPackages);
router.get("/:id", getPackageById);

router.post("/", createPackage);
router.put("/:id", updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;