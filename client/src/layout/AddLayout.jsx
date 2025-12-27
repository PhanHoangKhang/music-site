import { Outlet } from "react-router-dom";
import SideBarAdd from "../addPlace/components/SideBarAdd";
import Play from "../components/Play";
import Navbar from "../components/Navbar";

const AddLayout = () => {
  return (
    <div className="bg-black h-screen">
      <div className="flex h-[90%]">
        <SideBarAdd />
        <div className="w-full px-6 rounded bg-[#121212] text-white overflow-auto pt-4">
          <Navbar></Navbar>
          <Outlet />
        </div>
      </div>
      <Play></Play>
    </div>
  );
};

export default AddLayout;
