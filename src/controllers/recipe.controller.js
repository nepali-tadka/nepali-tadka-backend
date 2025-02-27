const Recipe = require("../models/recipe.model");
const Category = require("../models/category.model");
const Review = require("../models/review.model");

class RecipeController {
  async getRecipes(req, res) {
    try {
      const recipes = await Recipe.find({ status: "APPROVED" })
        .populate("category")
        .populate("createdBy");

      const recipesWithAverageRating = await Promise.all(
        recipes.map(async (recipe) => {
          const reviews = await Review.find({ recipe: recipe._id });
          const averageRating =
            reviews.reduce((acc, review) => acc + review.rating, 0) /
              reviews.length || 0;
          return { ...recipe.toObject(), averageRating };
        })
      );

      res.status(200).json(recipesWithAverageRating);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving recipes", error });
    }
  }

  async getRecipeById(req, res) {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findById(id)
        .populate("category")
        .populate("createdBy")
        .populate("updatedBy");

      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const reviews = await Review.find({ recipe: recipe._id });
      const averageRating =
        reviews.reduce((acc, review) => acc + review.rating, 0) /
          reviews.length || 0;

      res.status(200).json({ ...recipe.toObject(), averageRating });
    } catch (error) {
      res.status(500).json({ message: "Error retrieving recipe", error });
    }
  }

  async createRecipe(req, res) {
    const {
      title,
      description,
      ingredients,
      instructions,
      category,
      imageUrl,
    } = req.body;
    try {
      const categoryRecord = await Category.findById(category);
      if (!categoryRecord) {
        return res.status(400).json({ message: "Invalid category" });
      }

      const newRecipe = new Recipe({
        title,
        description,
        ingredients,
        instructions,
        category: categoryRecord._id,
        imageUrl,
        createdBy: req.user._id,
        status: req.user.role.name === "ADMIN" ? "APPROVED" : "PENDING",
      });
      await newRecipe.save();
      res.status(201).json(newRecipe);
    } catch (error) {
      res.status(500).json({ message: "Error creating recipe", error });
    }
  }

  async approveRecipe(req, res) {
    const { id } = req.params;

    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found." });
      }

      recipe.status = "APPROVED";
      await recipe.save();
      res.status(200).json({ message: `Recipe approved successfully.` });
    } catch (error) {
      res.status(500).json({ message: "Error updating recipe status", error });
    }
  }

  async rejectRecipe(req, res) {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      recipe.status = "REJECTED";
      await recipe.save();
      res.status(200).json({ message: "Recipe rejected successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error rejecting recipe", error });
    }
  }

  async deleteRecipe(req, res) {
    const { id } = req.params;
    try {
      const recipe = await Recipe.findByIdAndDelete(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting recipe", error });
    }
  }

  async getUserRecipes(req, res) {
    try {
      const recipes = await Recipe.find({ createdBy: req.user._id }).populate(
        "category"
      );
      res.status(200).json(recipes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving user's recipes", error });
    }
  }

  async updateRecipe(req, res) {
    const { id } = req.params;
    const { role } = req.user;
    const {
      title,
      description,
      ingredients,
      instructions,
      category,
      imageUrl,
    } = req.body;
    try {
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      if (
        recipe.status !== "PENDING" &&
        recipe.status !== "REJECTED" &&
        role.name !== "ADMIN"
      ) {
        return res.status(403).json({
          message:
            "Only recipes in PENDING status can be edited. APPROVED recipes can only be edited by admin.",
        });
      }

      const categoryRecord = await Category.findById(category);
      if (!categoryRecord) {
        return res.status(400).json({ message: "Invalid category" });
      }

      recipe.title = title;
      recipe.description = description;
      recipe.ingredients = ingredients;
      recipe.instructions = instructions;
      recipe.category = categoryRecord._id;
      recipe.imageUrl = imageUrl;
      recipe.updatedAt = Date.now();
      recipe.status = role.name === "ADMIN" ? "APPROVED" : "PENDING";
      recipe.updatedBy = req.user._id;

      await recipe.save();
      res.status(200).json(recipe);
    } catch (error) {
      res.status(500).json({ message: "Error updating recipe", error });
    }
  }

  async getPendingRecipes(req, res) {
    try {
      const recipes = await Recipe.find({ status: "PENDING" })
        .populate("category")
        .populate("createdBy");
      res.status(200).json(recipes);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving pending recipes", error });
    }
  }
}

module.exports = new RecipeController();
