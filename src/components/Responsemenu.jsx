import { UserButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const Responsemenu = ({ opennav, setopennav }) => {
  const { user } = useUser();
  return (
    <div
      className={`${
        opennav ? "left-0" : "-left-[100%]"
      } fixed bg-white bottom-0 top-0 w-[75%] h-screen z-20 duration-500 flex flex-col justify-between px-8 pb-6 pt-16 text-black md:hidden rounded-r-xl shadow-md backdrop-blur-lg transition-all`}
    >
      <div>
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-start gap-3">
            {user ? <UserButton size={50} /> : <FaUserCircle size={50} />}
            <div>
              <h1>Hello, {user?.firstName}</h1>
              <h1 className="text-sm text-slate-500">premim User</h1>
            </div>
          </div>
          <IoClose
            onClick={() => setopennav(false)}
            className="size-8 cursor-pointer hover:text-red-500 duration-500 transition-all hover:rotate-180"
          />
        </div>
        <nav className="mt-12">
          <ul
            onClick={() => setopennav(false)}
            className="flex flex-col gap-7 text-2xl font-semibold"
          >
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all w-fit border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all w-fit border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Product</li>
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all w-fit border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-4 transition-all w-fit border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Responsemenu;
