import React from "react";
import { FaFilter } from "react-icons/fa";
import { useData } from "../context/DataContext";

const Mobilefilter = ({
  openfilter,
  setopenfilter,
  search,
  setsearch,
  brand,
  setbrand,
  pricerange,
  setpricerange,
  category,
  setcategory,
}) => {
  const { data } = useData();

  return (
    <>
      <div className="bg-gray-100 flex justify-between items-center md:hidden px-4 p-2 mt-5">
        <h1 className="font-semibold text-xl">Filters</h1>
        <FaFilter
          onClick={() => setopenfilter(!openfilter)}
          className="text-gray-800 "
        />
      </div>
      {openfilter ? (
        <div className="bg-gray-100 p-2 md:hidden">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="bg-white p-2 rounded-md border-gray-400 border-2 outline-none"
          />
          {/* category only data */}
          <h1 className="mt-5 font-semibold test-xl">Category</h1>
          <div className="flex flex-col  gap-2 mt-3">
            {["All", ...new Set(data?.map((item) => item.category))].map(
              (product, index) => (
                <div
                  onClick={() =>
                    setTimeout(() => {
                      setopenfilter(false);
                    }, 100)
                  }
                  key={index}
                  className="flex gap-2 w-fit "
                >
                  <input
                    type="checkbox"
                    checked={product === category}
                    id={`for-${index}`}
                    value={product}
                    onChange={(e) => setcategory(e.target.value)}
                  />
                  <label
                    htmlFor={`for-${index}`}
                    className="cursor-pointer uppercase"
                  >
                    {product}
                  </label>
                </div>
              )
            )}
          </div>
          {/* brand only data */}
          <h1 className="mt-5 font-semibold test-xl mb-3">Brand</h1>
          <select
            className="bg-white w-full p-2 border-gray-200 border-2 rounded-md outline-none"
            value={brand}
            onChange={(e) => setbrand(e.target.value)}
          >
            {["All", ...new Set(data?.map((item) => item.brand))].map(
              (product, index) => (
                <option key={index} value={product}>
                  {product}
                </option>
              )
            )}
          </select>
          {/* price rang */}
          <h1 className="mt-5 font-semibold test-xl mb-3">Price Rang</h1>
          <div className="flex flex-col gap-2">
            <label htmlFor="">
              Price Range: ${pricerange[0]} - ${pricerange[1]}
            </label>
            <input
              type="range"
              min={0}
              max={5000}
              value={pricerange[1]}
              onChange={(e) =>
                setpricerange([pricerange[0], Number(e.target.value)])
              }
            />
          </div>
          <div className="text-center ">
            <button
              onClick={() => {
                setsearch("");
                setcategory("All");
                setbrand("All");
                setpricerange([0, 5000]);
                setopenfilter(false);
              }}
              className="bg-red-500 hover:bg-red-600 transition-all duration-500 text-white rounded-md px-3 py-2 mt-5 cursor-pointer  "
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Mobilefilter;
