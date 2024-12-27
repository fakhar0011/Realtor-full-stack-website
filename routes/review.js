const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsyncF = require("../utils/wrapAsyncf.js");
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");

const reviewController = require("../controllers/reviews.js");
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsyncF(reviewController.createReview)
);
// Delete review Route///
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsyncF(reviewController.destroyReview)
);

module.exports = router;
