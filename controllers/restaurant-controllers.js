const DB = require("./../database");

const getAllRestaurants = async (req, res) => {
    const { rows: restaurants } = await DB.query("SELECT * FROM restaurants");
    res.status(200).json({ status: "success", results: restaurants.length , data: { restaurants } });
};

const getOneRestaurant = async (req, res) => {
    const { id } = req.params;
    const { rows: restaurant } = await DB.query("SELECT * FROM restaurants WHERE id = $1", [id]);
    res.status(200).json({ status: "success", data: { restaurant: restaurant[0] } });
};

const createRestaurant = async (req, res) => {
    const { name, location, price_range } = req.body;
    const { rows: restaurant } = await DB.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *", [name, location, price_range]);
    res.status(201).json({ status: "success", data: { restaurant: restaurant[0] } });
};

const updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { name, location, price_range } = req.body;
    const { rows: restaurant } = await DB.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", [name, location, price_range, id]);
    res.status(200).json({ status: "success", data: { restaurant: restaurant[0] } });
};

const deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    await DB.query("DELETE FROM restaurants WHERE id = $1", [id]);
    res.status(204).json({ status: "success", data: null });
};

module.exports = {
    getAllRestaurants,
    getOneRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
};