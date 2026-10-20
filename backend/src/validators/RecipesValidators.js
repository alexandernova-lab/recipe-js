const { body } = require("express-validator");

const recipeValidator = {
  createRecipeValidator: [
    body("title").isString().notEmpty().withMessage("Title is required"),
    body("description")
      .isString()
      .notEmpty()
      .withMessage("Description is required"),
    body("ingredients")
      .isArray({
        min: 1,
        withMessage: "Ingredients must be an array of at least 1 item",
      })
      .notEmpty()
      .withMessage("Ingredients is required"),
  ],
};

module.exports = recipeValidator;
