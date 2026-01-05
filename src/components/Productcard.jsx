import React, { useEffect } from "react";
import { useData } from "../context/DataContext";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Carts } from "../context/CartContent";
const Productcard = ({ product }) => {
  const { fetchallproduct } = useData();
  useEffect(() => {
    fetchallproduct();
  }, []);

  const navigate = useNavigate();
  const { addtocart } = Carts();
  return (
    <div className=" w-[170px] sm:w-full border relative border-gray-100 rounded-2xl  hover:scale-105  hover:shadow-2xl transition-all  ">
      <img
        loading="lazy"
        key={product.id}
        onClick={() => navigate(`/products/${product.id}`)}
        src={product.images[0]}
        alt=""
        className="bg-gray-100 cursor-pointer aspect-square rounded-md sm:w-full "
      />
      <div className="p-3 text-center flex flex-col  h-[200px] ">
        <h1 className="mt-2 line-clamp-2 p-1 font-semibold">{product.title}</h1>
        <p className="my-3 text-lg text-gray-800 font-bold">${product.price}</p>
        <button
          onClick={() => addtocart(product)}
          className=" mt-auto mb-2 bg-red-500  py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-1 items-center justify-center font-semibold"
        >
          <IoCartOutline className="w-6 h-6" /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Productcard;
