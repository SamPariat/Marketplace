import { TbHomeDot, TbLogout, TbLogin } from "react-icons/tb";
import { AiOutlineProject } from "react-icons/ai";
import { FaIndianRupeeSign, FaReact } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

import SideBarLinks from "./SideBarLinks";

const SideBar = () => {
  return (
    <div className="shadow-lg top-0 left-0">
      <div className="flex flex-col w-1/3 lg:w-1/5 bg-slate-200 dark:bg-slate-900 text-slate-200 dark:text-slate-900 min-h-screen relative">
        <div className="w-full">
          <span className="flex flex-row justify-center text-3xl space-x-2 mt-10">
            <FaReact className="text-slate-900 dark:text-slate-200" />
            <h1 className="font-raleway text-slate-900 dark:text-slate-200">
              Admin Panel
            </h1>
          </span>
        </div>
        <div className="mt-10">
          <SideBarLinks icon={TbHomeDot} text="Home" linkTo="" />
          <SideBarLinks
            icon={AiOutlineProject}
            text="Projects"
            linkTo="/projects"
          />
          <SideBarLinks
            icon={FaIndianRupeeSign}
            text="Billing"
            linkTo="/billing"
          />
          <SideBarLinks icon={FiShoppingCart} text="Items" linkTo="/items" />
        </div>
        <div className="absolute bottom-0">
          <SideBarLinks icon={TbLogin} text="Login" linkTo="/login" />
          <SideBarLinks icon={TbLogout} text="Logout" linkTo="/logout" />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
