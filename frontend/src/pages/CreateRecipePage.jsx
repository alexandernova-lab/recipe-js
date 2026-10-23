import { useState } from "react";
import Ingredients from "../components/Ingredients";
import { CirclePlus } from "lucide-react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";

const CreateRecipePage = () => {
  const { id } = useParams();
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");
  // Value From Form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

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

      let res;

      if (id) {
        res = await axios.patch(
          "http://localhost:4000/api/recipes/" + id,
          recipe,
          {
            withCredentials: true,
          },
        );
      } else {
        res = await axios.post("http://localhost:4000/api/recipes", recipe, {
          withCredentials: true,
        });
      }

      // file
      let formData = new FormData();
      formData.set("photo", file);

      //upload
      let uploadRes = await axios.post(
        `http://localhost:4000/api/recipes/${res.data.recipe._id}/upload`,
        formData,

        {
          withCredentials: true,
          headers: {
            Accept: "multipart/form-data",
          },
        },
      );
      console.log(uploadRes);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      console.log(e.response?.data);
    }
  };
  let upload = (e) => {
    let file = e.target.files[0];
    setFile(file);
    //preview
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      setPreview(e.target.result);
    };

    fileReader.readAsDataURL(file);
  };
  return (
    <div className=" max-w-md mx-auto">
      <h1 className=" text-2xl text-center text-orange-400 font-bold mb-5">
        {id ? "Update" : "Create"} Recipe Page
      </h1>
      <form onSubmit={createHandler} className=" space-y-5">
        <input type="file" onChange={upload} />
        {preview && <img src={preview} alt="" />}
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
          className=" w-full p-2 border border-orange-400 rounded-md"></textarea>
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
          className=" px-4 py-2 bg-orange-400 text-white font-bold rounded-md w-full hover:bg-orange-300">
          {id ? "Update" : "Create"} Recipe
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
