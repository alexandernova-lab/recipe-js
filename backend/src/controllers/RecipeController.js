const { default: mongoose } = require("mongoose");
const Recipe = require("../models/Recipe");

const RecipeController = {
  store: async (req, res) => {
    const { title, description, ingredients } = req.body;

    const recipe = await Recipe.create({
      title,
      description,
      ingredients,
    });
    return res.status(201).json({ message: "Recipe Created", recipe });
  },

  getRecipes: async (req, res) => {
    try {
      const recipes = await Recipe.find();
      return res.status(200).json({ message: "All Recipes", recipes });
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  },

  getSingleRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const recipe = await Recipe.findById(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.status(200).json(recipe);
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const recipe = await Recipe.findByIdAndDelete(id);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.status(200).json({ message: "Recipe deleted" });
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, ingredients } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Not a valid id" });
      }
      const recipe = await Recipe.findByIdAndUpdate(
        id,
        {
          title,
          description,
          ingredients,
        },
        { new: true },
      );
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }
      return res.status(200).json({ message: "Recipe updated", recipe });
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  },
};

module.exports = RecipeController;
