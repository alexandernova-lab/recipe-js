import React, { useState } from "react";
import Ingredients from "../components/Ingredients";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { useEffect } from "react";

const CreateRecipePage = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        const res = await axios.get("http://localhost:4000/api/recipes/" + id);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setIngredients(res.data.ingredients);
      }
    };
    fetchRecipe();
  }, [id]);

  // Value From Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  // Add Ingredient
  const addIngredient = () => {
    setIngredients((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };

  // Create Recipe
  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const recipe = {
        title,
        description,
        ingredients,
      };
      if (!id) {
        const response = await axios.post(
          "http://localhost:4000/api/recipes",
          recipe,
        );
        if (response.status === 201) {
          navigate("/");
          toast.success("Recipe Created Successfully");
        }
      }
      if (id) {
        const response = await axios.patch(
          "http://localhost:4000/api/recipes/" + id,
          recipe,
        );
        if (response.status === 200) {
          navigate("/");
          toast.success("Recipe Updated Successfully");
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className=" max-w-md mx-auto">
      <h1 className=" text-2xl text-center text-orange-400 font-bold mb-5">
        {id ? "Update" : "Create"} Recipe Page
      </h1>
      <form onSubmit={createHandler} className=" space-y-5">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Recipe Title"
          className=" w-full p-2 border border-orange-400 rounded-md"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          name=""
          id=""
          rows={5}
          placeholder="Enter Recipe Description"
          className=" w-full p-2 border border-orange-400 rounded-md"
        ></textarea>
        <div className=" flex items-center space-x-3">
          <input
            type="text"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
            placeholder="Enter Ingregients"
            className=" w-full p-2 border border-orange-400 rounded-md"
          />
          <CirclePlus className="text-orange-400" onClick={addIngredient} />
        </div>
        <Ingredients ingredients={ingredients} />
        <button
          type="submit"
          className=" px-4 py-2 bg-orange-400 text-white font-bold rounded-md w-full hover:bg-orange-300"
        >
          {id ? "Update" : "Create"} Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
