const express = require("express");

const {
  getAllBuses,
  getBusById,
  searchBuses,
  createBus,
  updateBus,
  deleteBus
} = require("../controllers/busController");

const router = express.Router();

router.get("/search", searchBuses);
router.get("/", getAllBuses);
router.get("/:id", getBusById);

router.post("/", createBus);
router.put("/:id", updateBus);
router.delete("/:id", deleteBus);

module.exports = router;