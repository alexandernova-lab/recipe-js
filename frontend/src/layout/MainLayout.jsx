import NavBar from "../components/NavBar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <div className="mt-10 p-5">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;
