import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  const [navbar, setNavbar] = useState(false);
  const changeNavbar = () => {
    if (scrollY >= 100) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };
  addEventListener("scroll", changeNavbar);
  return (
    <>
      <ul
        className={
          navbar
            ? "menu w-1/4 h-screen p-0  bg-base-100  z-10 overflow-y-scroll no-scrollbar fixed border-r-2 mt-[130px]"
            : "menu w-1/4 h-screen p-0  bg-base-100  z-10 overflow-y-scroll no-scrollbar fixed border-r-2"
        }
      >
        <h2 className="text-3xl text-center mb-10">Admin Menu</h2>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/manage-category"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Categories
          </NavLink>
        </li>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/slides"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Slides
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default AdminMenu;