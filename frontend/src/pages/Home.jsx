import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";
import { Link } from "react-router";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch("http://localhost:4000/api/recipes");
      const data = await response.json();
      setRecipes(data.recipes);
    };
    fetchRecipes();
  }, []);
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
            <BlogList recipe={recipe} key={recipe._id} />
          ))}
      </div>
    </>
  );
};

export default Home;
