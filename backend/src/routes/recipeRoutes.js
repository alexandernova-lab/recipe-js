const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const { createRecipeValidator } = require("../validators/RecipesValidators");
const validateRequest = require("../middlewares/validateRequest");
const upload = require("../utils/upload");

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

router.post("/:id/upload", upload.single("photo"), RecipeController.upload);

module.exports = router;
