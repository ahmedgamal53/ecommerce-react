import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div className="my-5 flex flex-col gap-5 justify-center items-center h-screen">
      <h1 className="text-red-600 text-8xl mb-5 font-semibold ">404</h1>
      <p className="font-semibold text-2xl ">The page Not Found</p>
      <Link to={"/"}>
        <button className="bg-red-500 px-3 py-1 text-white rounded-md mt-5 cursor-pointer">
          Go to Home
        </button>
      </Link>
    </div>
  );
};

export default Notfound;
