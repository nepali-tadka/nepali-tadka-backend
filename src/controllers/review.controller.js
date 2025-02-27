const Review = require("../models/review.model");
const Recipe = require("../models/recipe.model");

class ReviewController {
  async addReview(req, res) {
    const { rating, review } = req.body;
    const { recipeId } = req.params;

    try {
      const recipe = await Recipe.findById(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const newReview = new Review({
        rating,
        review,
        recipe: recipeId,
        user: req.user._id,
      });

      await newReview.save();
      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: "Error adding review", error });
    }
  }

  async getReviews(req, res) {
    const { recipeId } = req.params;

    try {
      const reviews = await Review.find({ recipe: recipeId }).populate("user");
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reviews", error });
    }
  }
}

module.exports = new ReviewController();
