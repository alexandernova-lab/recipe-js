const express = require("express");
const RecipeController = require("../controllers/RecipeController");
const { createRecipeValidator } = require("../validators/RecipesValidators");
const validateRequest = require("../middlewares/validateRequest");
const upload = require("../utils/upload");
const { imageValidator } = require("../validators/ImageUploadValidators");

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

router.post(
  "/:id/upload",
  upload.single("photo"),
  imageValidator,
  validateRequest,
  RecipeController.upload,
);

module.exports = router;
