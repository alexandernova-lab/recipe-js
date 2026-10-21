import React, { useState } from "react";
import Ingredients from "../components/Ingredients";
import { CirclePlus } from "lucide-react";

const CreateRecipePage = () => {
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  // Add Ingredient
  const addIngredient = () => {
    setIngredients((prev) => [newIngredient, ...prev]);
    setNewIngredient("");
  };
  return (
    <div className=" max-w-md mx-auto">
      <h1 className=" text-2xl text-center text-orange-400 font-bold mb-5">
        Create Recipe Page
      </h1>
      <form action="" className=" space-y-5">
        <input
          type="text"
          placeholder="Enter Recipe Title"
          className=" w-full p-2 border border-orange-400 rounded-md"
        />
        <textarea
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
      </form>
    </div>
  );
};

export default CreateRecipePage;
