const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    getAllReviews,
    createReview,
    getRestaurantReviewData
} = require("./../controllers/review-controllers");

router.get("/restaurant-review-data", getRestaurantReviewData);

router
    .route("/")
    .get(getAllReviews)
    .post(createReview);

module.exports = router;