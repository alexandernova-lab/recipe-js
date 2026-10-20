const { default: mongoose } = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Recipe", recipeSchema);
