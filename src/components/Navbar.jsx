import { MapPin } from "lucide-react";
import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { Carts } from "../context/CartContent";
import { HiMenuAlt1 } from "react-icons/hi";
import { HiMenuAlt3 } from "react-icons/hi";
import Responsemenu from "./Responsemenu";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { CgClose } from "react-icons/cg";
const Navbar = ({ location, getlocation, opendropdown, setopendropdown }) => {
  const { cartitem } = Carts();

  const [opennav, setopennav] = useState(false);
  const toggleopen = () => {
    setopendropdown(!opendropdown);
  };
  const menuopen = () => {
    setopennav(!opennav);
  };

  return (
    <div className="bg-white py-3 px-4 shadow-2xl">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* logo */}
        <div className="flex gap-7 items-center">
          <Link to={"/"}>
            <h1 className=" font-bold text-3xl">
              <span className="text-red-500 font-serif">Z</span>
              aptro
            </h1>
          </Link>
          <div className="md:flex hidden items-center cursor-pointer gap-1 text-gray-700">
            <MapPin className="text-red-500" />
            <span className="font-semibold">
              {location ? (
                <div className="-space-y-1 ">
                  <p>{location.country}</p>
                  <p>{location.state}</p>
                </div>
              ) : (
                "Add Address"
              )}
            </span>
            <FaCaretDown onClick={toggleopen} />
          </div>
          {opendropdown ? (
            <div className="p-5 fixed left-60 top-20 w-[250px] h-max shadow-2xl z-50 bg-white border-2 border-gray-100 rounded-md">
              <h1 className="flex justify-between items-center font-semibold mb-4 text-xl">
                Change Location
                <span>
                  <CgClose
                    className="cursor-pointer hover:text-red-500 duration-150"
                    onClick={toggleopen}
                  />
                </span>
              </h1>
              <button
                onClick={getlocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400 duration-300"
              >
                Detect my location
              </button>
            </div>
          ) : null}
        </div>
        {/* navbar */}
        <nav className="flex gap-7 items-center">
          <ul className=" md:flex  hidden gap-7 items-cente text-xl font-semiboldr">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `${
                  isActive
                    ? "border-b-3 transition-all border-red-500"
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
                    ? "border-b-3 transition-all border-red-500"
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
                    ? "border-b-3 transition-all border-red-500"
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
                    ? "border-b-4 transition-all border-red-500"
                    : "text-black"
                } cursor-pointer`
              }
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-7 w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-white">
              {cartitem.length}
            </span>
          </Link>
          <div className="hidden md:block">
            <SignedOut>
              <SignInButton className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
          <div onClick={menuopen} className="md:hidden block  cursor-pointer ">
            {opennav ? (
              <HiMenuAlt3 className="size-7" />
            ) : (
              <HiMenuAlt1 className="size-7" />
            )}
          </div>
        </nav>
      </div>
      <div>
        <Responsemenu setopennav={setopennav} opennav={opennav} />
      </div>
    </div>
  );
};

export default Navbar;
