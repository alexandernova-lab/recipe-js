import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  // Naviage
  const navigate = useNavigate();

  // Context
  const { user, dispatch } = useContext(AuthContext);

  // Logout Handler
  const logoutHandler = async () => {
    const res = await axios.post(
      "http://localhost:4000/api/user/logout",
      {},
      {
        withCredentials: true,
      },
    );
    if (res.status === 200) {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
      toast.success("Logout success");
    }
  };

  return (
    <nav className=" flex justify-between items-center p-5">
      <h1 className=" text-3xl text-orange-400">Recipcity</h1>
      <ul className=" flex space-x-3 items-center">
        <Link to={"/"} className=" hover:text-orange-400 cursor-pointer">
          Home
        </Link>
        <Link to={"/about"} className=" hover:text-orange-400 cursor-pointer">
          About
        </Link>
        <Link to={"/contact"} className=" hover:text-orange-400 cursor-pointer">
          Contact
        </Link>
      </ul>
      <div className="flex space-x-3 items-center">
        {!user && (
          <>
            <Link
              to={"/register"}
              className=" px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-gray-400">
              Register
            </Link>
            <Link
              to={"login"}
              className=" px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-orange-400">
              Login
            </Link>
          </>
        )}
        {!!user && (
          <button
            onClick={logoutHandler}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-orange-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
