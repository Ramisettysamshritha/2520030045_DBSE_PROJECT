const express = require("express");

const {
  getAllRestaurants,
  getRestaurantById,
  searchRestaurants,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} = require("../controllers/restaurantController");

const router = express.Router();

router.get("/search", searchRestaurants);
router.get("/", getAllRestaurants);
router.get("/:id", getRestaurantById);

router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

module.exports = router;