import { NavLink } from "react-router-dom";
import { IconType } from "react-icons/lib/esm/iconBase";
import { useState } from "react";

type SideBarLinksProps = {
  icon: IconType;
  text: string;
  linkTo: string;
};

const SideBarLinks = ({ icon, text, linkTo }: SideBarLinksProps) => {
  const Icon = icon;
  const [active, setActive] = useState<boolean>(false);

  return (
    <NavLink
      to={linkTo}
      className={({ isActive }) => {
        setActive(isActive);
        return isActive ? "font-semibold" : undefined;
      }}
    >
      <span
        className={`flex flex-row items-center space-x-2 mx-6 my-5 w-fit pr-2 ${
          active
            ? "border-b-2 border-b-slate-900 dark:border-b-slate-200"
            : undefined
        }`}
      >
        <Icon className="text-slate-900 dark:text-slate-200" />
        <p className="font-exo text-slate-900 dark:text-slate-200">{text}</p>
      </span>
    </NavLink>
  );
};

export default SideBarLinks;