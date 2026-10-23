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
      // For Pagination
      const page = Number(req.query.page) || 1;
      const limit = Math.min(Number(req.query.limit) || 6, 50);

      const result = await Recipe.paginate(
        {},
        { page, limit, sort: { createdAt: -1 } },
      );
      return res.status(200).json({
        message: "All Recipes",
        recipes: result.docs,
        page: result.page,
        totalPages: result.totalPages,
        totalRecipes: result.totalDocs,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
      });
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
  upload: (req, res) => {
    try {
      console.log(req.file);
      res.json({ message: "Image Uploaded" });
    } catch (error) {
      return res.status(400).json({ message: "Something went wrong" });
    }
  },
};

module.exports = RecipeController;
