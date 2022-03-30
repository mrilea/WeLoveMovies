const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  // MIDDLEWARE to verify that a movie exists with a matching movieId
  const methodName = "movieExists";
  req.log.debug({ __filename, methodName });
  const movie = await service.read(Number(req.params.movieId));
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found` });
  req.log.trace({ __filename, methodName, return: true, movie });
}

async function list(req, res, next) {
  const methodName = "list";
  req.log.debug({ __filename, methodName });
  const { is_showing = false } = req.query;
  const data = await service.list(Boolean(is_showing));
  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

async function read(req, res, next) {
  const methodName = "read";
  req.log.debug({ __filename, methodName });
  const data = res.locals.movie;
  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

async function showingInTheater(req, res, next) {
  // returns a list of theaters showing the movie that matches the movieId
  const methodName = "showingInTheater";
  req.log.debug({ __filename, methodName });
  const movieId = req.params.movieId;
  const data = await service.movieInTheater(movieId);
  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

async function movieReviews(req, res, next) {
  // returns a list of reviews that match the movie with the movieId
  const methodName = "movieReviews";
  req.log.debug({ __filename, methodName });
  const movieId = req.params.movieId;
  const data = await service.movieReviews(movieId);
  res.json({ data });
  req.log.trace({ __filename, methodName, return: true, data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), read],
  showingInTheater: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(showingInTheater),
  ],
  movieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(movieReviews),
  ],
};
