import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaIndianRupeeSign, FaReact } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { TbHomeDot, TbLogin, TbLogout } from "react-icons/tb";

import type { RootState } from "../../redux";
import { useAppDispatch } from "../../utils/hooks/useAppDispatch";
import { useAppSelector } from "../../utils/hooks/useAppSelector";
import SideBarLinks from "./SideBarLinks";

import { logout } from "../../redux/slices/userSlice";
import { ADMIN, BILLER, INVENTORY_MANAGER } from "../../utils/constants";

const SideBar = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const isAdmin: boolean = user.token !== undefined && user.role === ADMIN;
  const isInventoryManager: boolean =
    user.token !== undefined && user.role === INVENTORY_MANAGER;
  const isBiller: boolean = user.token !== undefined && user.role === BILLER;
  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col flex-shrink-0 w-1/3 lg:w-1/5 bg-slate-200 dark:bg-slate-900 text-slate-200 dark:text-slate-900 min-h-screen relative shadow-2xl top-0 left-0">
      <div className="w-full">
        <span className="flex flex-row justify-center text-3xl space-x-2 mt-10">
          <FaReact className="text-slate-900 dark:text-slate-200" />
          <h1 className="font-raleway text-slate-900 dark:text-slate-200">
            Admin Panel
          </h1>
        </span>
      </div>
      <div className="mt-10">
        <SideBarLinks icon={TbHomeDot} text="Home" linkTo="/home" />
        {user.token && (isAdmin || isInventoryManager) && (
          <SideBarLinks
            icon={BiCategory}
            text="Categories"
            linkTo="categories"
          />
        )}
        {user.token && (isAdmin || isInventoryManager) && (
          <SideBarLinks icon={FiShoppingCart} text="Items" linkTo="items" />
        )}
        {user.token && (isAdmin || isBiller) && (
          <SideBarLinks
            icon={FaIndianRupeeSign}
            text="Billing"
            linkTo="billing"
          />
        )}
        <SideBarLinks icon={CgProfile} text="Profile" linkTo="profile" />
      </div>
      <div className="absolute bottom-0">
        {user.token ? (
          <SideBarLinks
            icon={TbLogout}
            text="Logout"
            linkTo="/logout"
            onClick={() => dispatch(logout())}
          />
        ) : (
          <SideBarLinks icon={TbLogin} text="Login" linkTo="/login" />
        )}
      </div>
    </div>
  );
};

export default SideBar;
