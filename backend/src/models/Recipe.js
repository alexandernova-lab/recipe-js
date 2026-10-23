const { default: mongoose } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const recipeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
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

recipeSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Recipe", recipeSchema);
