const express = require("express");
const router = express.Router();

const {
    getAllRestaurants,
    getOneRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require("./../controllers/restaurant-controllers");

const reviewRouter = require("./review-routes");

router.use("/:id", reviewRouter);

router
    .route("/")
    .get(getAllRestaurants)
    .post(createRestaurant);

router
    .route("/:id")
    .get(getOneRestaurant)
    .patch(updateRestaurant)
    .delete(deleteRestaurant);

module.exports = router;