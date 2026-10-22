import { Link } from "react-router";

const NavBar = () => {
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
        <Link
          to={"/register"}
          className=" px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-gray-400"
        >
          Register
        </Link>
        <Link
          to={"login"}
          className=" px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-orange-400"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
