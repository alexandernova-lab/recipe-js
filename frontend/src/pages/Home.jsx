import { useEffect, useState } from "react";
import BlogList from "../components/BlogList";

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
    <div className="grid grid-cols-3 gap-4">
      {!!recipes &&
        recipes.map((recipe) => <BlogList recipe={recipe} key={recipe._id} />)}
    </div>
  );
};

export default Home;
