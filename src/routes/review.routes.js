const express = require("express");
const ReviewController = require("../controllers/review.controller");
const auth = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/:recipeId", auth, ReviewController.addReview);
router.get("/:recipeId", ReviewController.getReviews);

module.exports = router;
