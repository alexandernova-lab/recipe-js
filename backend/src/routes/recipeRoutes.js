const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const { createRecipeValidator } = require("../validators/RecipesValidators");
const validateRequest = require("../middlewares/validateRequest");

const router = express.Router();

router.post(
  "/",
  createRecipeValidator,
  validateRequest,
  RecipeController.store,
);
router.get("/", RecipeController.getRecipes);
router.get("/:id", RecipeController.getSingleRecipe);
router.patch("/:id", RecipeController.update);
router.delete("/:id", RecipeController.delete);

module.exports = router;
