const DB = require("./../database");

const getAllReviews = async (req, res) => {
    const { id } = req.params;
    const { rows: reviews } = await DB.query("SELECT * FROM reviews WHERE restaurant_id = $1", [id]);
    res.status(200).json({ status: "success", results: reviews.length, data: { reviews } });
};

const createReview = async (req, res) => {
    const { id } = req.params;
    const { name, review, rating } = req.body;
    const { rows: newReview } = await DB.query("INSERT INTO reviews (restaurant_id, name, review, rating) VALUES ($1, $2, $3, $4) RETURNING *", [id, name, review, rating]);
    res.status(201).json({ status: "success", data: { review: newReview[0] } });
};

const getRestaurantReviewData = async (req, res) => {
    const { rows: reviewData } = await DB.query("SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = review.restaurant_id");
    res.status(200).json({ status: "success", data: { reviewData } });
};

module.exports = {
    getAllReviews,
    createReview,
    getRestaurantReviewData
};