import Ingredients from "./Ingredients";

const RecipeList = ({ recipe }) => {
  return (
    <>
      <div className="max-w-sm rounded-xl border border-gray-200 bg-white p-5 shadow-md">
        <h3 className="text-xl font-bold text-gray-900">{recipe.title}</h3>
        <p className="mt-1 text-sm text-gray-600">{recipe.description}</p>

        <Ingredients ingredients={recipe.ingredients} />

        <p className="mt-4 text-xs text-gray-400">{recipe.createdAt}</p>
      </div>
    </>
  );
};

export default RecipeList;
