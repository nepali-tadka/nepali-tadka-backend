const express = require("express");
const RecipeController = require("../controllers/recipe.controller");
const auth = require("../middleware/auth.middleware");
const { isAdmin } = require("../middleware/role.middleware");

const router = express.Router();

router.get("/", RecipeController.getRecipes);
router.post("/", auth, RecipeController.createRecipe);
router.get("/user", auth, RecipeController.getUserRecipes);
router.get("/pending", auth, isAdmin, RecipeController.getPendingRecipes);
router.get("/:id", RecipeController.getRecipeById);
router.put("/:id", auth, RecipeController.updateRecipe);
router.delete("/:id", auth, RecipeController.deleteRecipe);
router.post("/:id/approve", auth, isAdmin, RecipeController.approveRecipe);
router.post("/:id/reject", auth, isAdmin, RecipeController.rejectRecipe);

module.exports = router;
