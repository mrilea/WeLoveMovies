if (process.env.DATABASE_URL) require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("./config/logger")

const notFound = require("./errors/notFound");
const errorHandler = require("./errors/errorHandler");
const moviesRouter = require("./movies/movies.router");
const theathersRouter = require("./theaters/theaters.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(logger);
app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/theaters", theathersRouter);
app.use("/reviews", reviewsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
