const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("content");

const VALID_PROPERTIES = [
  "content",
  "score",
  "movie_id",
  "critic_id",
  "created_at",
  "updated_at",
];

function hasOnlyValidProperties(req, res, next) {
  const methodName = "hasOnlyValidProperties";
  req.log.debug({ __filename, methodName });
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  }
  next();
  req.log.trace({ __filename, methodName, return: true, data });
}

async function reviewExists(req, res, next) {
  const methodName = "reviewExists";
  req.log.debug({ __filename, methodName });
  const reviewId = req.params.movieId;
  const matchingReview = await service.read(reviewId);
  if (matchingReview) {
    res.locals.review = matchingReview;
    return next();
  }
  next({ status: 404, message: "Review cannot be found." });
  req.log.trace({ __filename, methodName, return: true, matchingReview });
}

async function update(req, res, next) {
  const methodName = "update";
  req.log.debug({ __filename, methodName });
  const updatedReview = { ...res.locals.review, ...req.body.data };
  await service.update(updatedReview);
  const reviewToReturn = await service.getReviewWithCritic(
    res.locals.review.review_id
  );
  res.json({ data: reviewToReturn });
  req.log.trace({ __filename, methodName, return: true, reviewToReturn });
}

async function destroy(req, res, next) {
  const methodName = "destroy";
  req.log.debug({ __filename, methodName });
  const review = res.locals.review;
  await service.destroy(review.review_id);
  res.sendStatus(204);
  req.log.trace({ __filename, methodName, return: true, review });
}

module.exports = {
  update: [
    asyncErrorBoundary(reviewExists),
    hasOnlyValidProperties,
    hasRequiredProperties,
    asyncErrorBoundary(update),
  ],
  delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
};
