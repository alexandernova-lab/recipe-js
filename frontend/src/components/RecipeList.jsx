import { Link } from "react-router";
import Ingredients from "./Ingredients";
import axios from "axios";

const RecipeList = ({ recipe, onDeleted }) => {
  const deleteRecipeHandler = async () => {
    const response = await axios.delete(
      "http://localhost:4000/api/recipes/" + recipe._id,
    );
    if (response.status === 200) {
      onDeleted(recipe._id);
    }
  };
  return (
    <>
      <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-md">
        <div className=" flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-900">{recipe.title}</h3>
          <Link
            to={`update-recipe/${recipe._id}`}
            className=" px-4 py-2 bg-green-500 text-white font-bold rounded-md cursor-pointer"
          >
            Update
          </Link>
        </div>

        <p className="mt-1 text-sm text-gray-600">{recipe.description}</p>
        <button
          className=" px-4 py-2 text-white font-bold bg-red-500 rounded-md"
          onClick={deleteRecipeHandler}
        >
          Delete
        </button>

        <Ingredients ingredients={recipe.ingredients} />

        <p className="mt-4 text-xs text-gray-400">{recipe.createdAt}</p>
      </div>
    </>
  );
};

export default RecipeList;
