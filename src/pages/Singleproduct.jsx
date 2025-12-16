import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import loading from "../assets/src_assets_Loading4.webm";
import Breadcrumb from "../components/Breadcrumb";
import { IoCartOutline } from "react-icons/io5";
import { useData } from "../context/DataContext";
import Productcard from "../components/Productcard";
import { Carts } from "../context/CartContent";
const Singleproduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [singleproduct, setsingleproduct] = useState("");
  const { data, fetchallproduct } = useData();
  const [mainImage, setMainImage] = useState("");
  const { addtocart } = Carts();
  const getsingleproduct = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/${params.id}?select=title,price,images,category,description,brand,discountPercentage`
      );
      const product = res.data;
      setsingleproduct(product);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getsingleproduct();
    window.scrollTo(0, 0);
  }, [params.id]);

  useEffect(() => {
    fetchallproduct();
  }, []);

  useEffect(() => {
    if (singleproduct && singleproduct.images) {
      setMainImage(singleproduct.images[0]);
    }
  }, [singleproduct]);

  const orignalprice = Math.round(
    singleproduct.price +
      (singleproduct.price * singleproduct.discountPercentage) / 100
  );

  const handleImage = (img) => {
    setMainImage(img);
  };

  return singleproduct ? (
    <div className="px-4 pb-4 md:px-0">
      <Breadcrumb title={singleproduct.title} />
      <div className="max-w-6xl mx-auto md:p-6  grid md:grid-cols-3 grid-cols-1 gap-2">
        {/* product image */}
        <div className="flex justify-center items-center mx-auto md:flex-col gap-2 w-1/2 ">
          {singleproduct.images?.map((item, index) => (
            <div
              key={index}
              className="w-1/2 cursor-pointer"
              onClick={() => handleImage(item)}
            >
              <img src={item} alt="" className="" />
            </div>
          ))}
        </div>
        <div className="w-1/2 mx-auto  md:w-full mainimage">
          <img
            src={mainImage}
            alt={singleproduct.title}
            className="rounded-2xl w-full   "
          />
        </div>
        {/* product detalis */}
        <div className="flex flex-col items-center  gap-6">
          <h1 className="md:text-3xl font-bold text-gray-800">
            {singleproduct.title}
          </h1>
          <div className="text-gray-700">
            {singleproduct.brand?.toUpperCase()} /{" "}
            {singleproduct.category?.toUpperCase()}{" "}
          </div>
          <p className="text-xl flex flex-wrap gap-1 justify-center items-center text-red-500 font-bold">
            ${singleproduct.price}{" "}
            <span className="line-through mx-2 text-gray-700">
              ${orignalprice}
            </span>
            <span className="bg-red-500  text-white px-2 py-2 rounded-md ">
              {singleproduct.discountPercentage}% discount
            </span>
          </p>
          <p
            className="
          text-gray-600"
          >
            {singleproduct.description}
          </p>
          {/* qunatity selector */}
          <div className="flex items-center gap-4">
            <label htmlFor="" className="text-sm font-medium text-gray-700">
              Quantity
            </label>
            <input
              type="number"
              min={1}
              value={1}
              className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-red-500 "
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => addtocart(singleproduct)}
              className="cursor-pointer px-6 flex gap-2 py-2 text-lg bg-red-500 text-white rounded-md"
            >
              <IoCartOutline className="size-6" /> Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center my-10  ">
        {data
          ?.filter(
            (product) =>
              product.category === singleproduct.category &&
              product.id !== singleproduct.id
          )
          .map((product, index) => (
            <div key={index}>
              <div className="m-3  w-[200px] sm:w-[250px] border relative border-gray-100 rounded-2xl  hover:scale-105  hover:shadow-2xl transition-all ">
                <img
                  onClick={() => navigate(`/products/${product.id}`)}
                  src={product.images[0]}
                  alt=""
                  className="bg-gray-100 cursor-pointer aspect-square rounded-md w-full "
                />
                <div className="p-3 text-center flex flex-col  h-[200px] ">
                  <h1 className="mt-2 line-clamp-2 p-1 font-semibold">
                    {product.title}
                  </h1>
                  <p className="my-3 text-lg text-gray-800 font-bold">
                    ${product.price}
                  </p>
                  <button
                    onClick={() => addtocart(product)}
                    className=" mt-auto mb-2 bg-red-500  py-2 text-lg rounded-md text-white w-full cursor-pointer flex gap-1 items-center justify-center font-semibold"
                  >
                    <IoCartOutline className="w-6 h-6" /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <video muted autoPlay loop>
        <source src={loading} type="video/webm" />
      </video>
    </div>
  );
};

export default Singleproduct;
