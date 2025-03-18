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
            ? "menu w-1/5 h-screen p-0  bg-base-100  z-10 overflow-y-scroll no-scrollbar fixed border-r-2 mt-[130px]"
            : "menu w-1/5 h-screen p-0  bg-base-100  z-10 overflow-y-scroll no-scrollbar fixed border-r-2"
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
            to={"/dashboard/manage-sub-category"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Sub Categories
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
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/stores"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Stores
          </NavLink>
        </li>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/products"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Products
          </NavLink>
        </li>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/colors"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Colors
          </NavLink>
        </li>
        <li className="border-b-2">
          <NavLink
            to={"/dashboard/sizes"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            Sizes
          </NavLink>
        </li>

        <li className="border-b-2">
          <NavLink
            to={"/dashboard/directors"}
            className={({ isActive }) =>
              [
                isActive ? "bg-gray-200" : "",
                "rounded-none transition-all active:text-[black!important] active:bg-[#e5e7eb!important] hover:outline-0",
              ].join(" ")
            }
          >
            BOD
          </NavLink>
        </li>

      </ul>
    </>
  );
};

export default AdminMenu;
