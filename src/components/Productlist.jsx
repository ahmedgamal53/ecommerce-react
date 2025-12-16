import React from "react";
import { useNavigate } from "react-router-dom";
import { Carts } from "../context/CartContent";

const Productlist = ({ product }) => {
  const navigate = useNavigate();
  const { addtocart } = Carts();
  return (
    <div className="space-y-4 mt-5 rounded-md">
      <div className="bg-gray-100 flex  md:gap-7 items-center p-2 rounded-md">
        <img
          src={product.images[0]}
          alt=""
          onClick={() => navigate(`/products/${product.id}`)}
          className="size-60 rounded-md cursor-pointer"
        />
        <div className="space-y-2 py-2">
          <h1 className="font-bold text-xl line-clamp-3 hover:text-red-400 w-full duration-200">
            {product.title}
          </h1>
          <p className="font-semibold flex md:flex-row flex-col md:items-center gap-2 text-lg ">
            <span className="text-4xl">${product.price}</span>(
            {product.discountPercentage}% off)
          </p>
          <p>
            Free delivery <span className="font-semibold">Fri, 18 Apr</span>{" "}
            <br />
            Or fastest delivery Tomorrow, 17Apr
          </p>
          <button
            onClick={() => addtocart(product)}
            className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productlist;
