import { createBrowserRouter, Navigate } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CreateRecipePage from "../pages/CreateRecipePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const RouterApp = () => {
  // Context
  const { user } = useContext(AuthContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: user ? <Home /> : <Navigate to={"/login"} />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/create-recipe",
          element: user ? <CreateRecipePage /> : <Navigate to={"/login"} />,
        },
        {
          path: "/update-recipe/:id",
          element: <CreateRecipePage />,
        },
        {
          path: "/register",
          element: !user ? <RegisterPage /> : <Navigate to={"/"} />,
        },
        {
          path: "/login",
          element: !user ? <LoginPage /> : <Navigate to={"/"} />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default RouterApp;
