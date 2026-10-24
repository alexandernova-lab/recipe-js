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

  // Loading
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
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
        setLoading(false);
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
          disabled={loading}
          className="flex w-full items-center justify-center px-4 py-2 bg-orange-400 text-white font-bold rounded-md hover:bg-orange-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-orange-400">
          {loading && (
            <svg
              className="mr-3 size-5 animate-spin text-white"
              viewBox="0 0 24 24"
              fill="none">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          )}
          {loading ? "Saving…" : `${id ? "Update" : "Create"} Recipe`}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipePage;
