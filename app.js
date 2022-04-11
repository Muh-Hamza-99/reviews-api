require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();

const morgan = require("morgan");

const restaurantRouter = require("./routes/restaurant-routes");
const reviewRouter = require("./routes/review-routes");

app.use(express.json({ limit: "10kb" }));

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use("/api/v1/restaurants", restaurantRouter);
app.use("/api/v1/reviews", reviewRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is up on port ${PORT}...`));