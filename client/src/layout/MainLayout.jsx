import Sidebar from "../components/sidebar";
import Play from "../components/Play";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <div className="bg-black h-screen">
      <div className="h-[90%] flex">
        <Sidebar />
        <div className="w-full m-2 px-6 rounded bg-[#121212] text-white overflow-auto pt-4">
          <Navbar></Navbar>
          <Outlet /> {/* pages render here */}
        </div>
      </div>
      <Play />
    </div>
  );
};

export default MainLayout;
