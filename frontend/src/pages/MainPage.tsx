import { Outlet } from "react-router-dom";
import SideBar from "../components/navbar/SideBar";

const MainPage = () => {
  return (
    <div className="flex flex-row">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default MainPage;
