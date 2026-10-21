import { useEffect, useState } from "react";
import { Link } from "react-router";
import RecipeList from "../components/RecipeList";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/api/recipes");
      const data = await response.json();
      setRecipes(data.recipes);
      setTotalPages(data.totalPages);
    };
    fetchRecipes();
  }, [page]);

  const onDeleted = (_id) => {
    if (recipes.length === 1 && page > 1) {
      navigate("/?page=" + (page - 1));
    } else {
      //handle delete on client side
      setRecipes((prev) => prev.filter((r) => r._id !== _id));
    }
  };
  return (
    <>
      <Link
        className="text-white font-bold bg-orange-400 px-4 py-2 rounded-md"
        to={"/create-recipe"}
      >
        Create Recipe
      </Link>
      <div className="grid grid-cols-3 gap-4 mt-5">
        {!!recipes &&
          recipes.map((recipe) => (
            <RecipeList
              recipe={recipe}
              key={recipe._id}
              onDeleted={onDeleted}
            />
          ))}
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="rounded border px-4 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Home;
