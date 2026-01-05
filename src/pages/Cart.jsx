import React, { useEffect, useState } from "react";
import { Carts } from "../context/CartContent";
import { FaRegTrashAlt } from "react-icons/fa";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import emptycart from "../assets/empty-cart.png";

const Cart = ({ getlocation, location }) => {
  const { user } = useUser();
  const { cartitem, updatequantity, deletitem } = Carts();
  const [form, setform] = useState({
    name: "",
    address: "",
    state: "",
    postcode: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (user?.fullName) {
      setform((prev) => ({
        ...prev,
        name: user.fullName,
      }));
    }
    if (location?.village) {
      setform((prev) => ({
        ...prev,
        address: location.village,
      }));
    }
  }, []);

  const handleChange = (e, about) => {
    setform((prev) => ({
      ...prev,
      [about]: e.target.value,
    }));
  };

  const naviget = useNavigate();
  const totalprice = cartitem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const displayprice = totalprice.toFixed(2); // يعرض اول رقمين عشري بس
  return (
    <div className="mt-10 p-3 max-w-6xl mx-auto mb-5">
      {cartitem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartitem.length}) </h1>
          <div className="">
            <div className="mt-10">
              {cartitem.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 mb-5 px-2 py-2 rounded-md flex items-center gap-4 justify-between mt-3 md:w-full"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        loading="lazy"
                        key={item.id}
                        src={item.images[0]}
                        alt=""
                        className="w-20 h-20 rounded-md"
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2 ">
                          {item.title}
                        </h1>
                        <p className="text-red-500 font-semibold text-lg">
                          {item.price}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 p-2 text-white flex gap-4 rounded-md font-bold text-xl">
                      <button
                        onClick={() => updatequantity(item.id, "decrease")}
                        className="cursor-pointer"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => updatequantity(item.id, "increase")}
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span
                      onClick={() => deletitem(item.id)}
                      className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl cursor-pointer"
                    >
                      <FaRegTrashAlt />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:grid-cols-2 grid-cols-1 gap-20 grid">
            <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
              <h1 className="texy-gray-800 font-bold text-xl">Delivery Info</h1>
              <div className="flex flex-col space-y-1">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => handleChange(e, "name")}
                  id="name"
                  placeholder="Enter Your Name"
                  className=" p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Address</label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) => handleChange(e, "address")}
                  placeholder="Enter Your Address"
                  className="p-2 rounded-md"
                />
              </div>
              <div className="flex flex-col  lg:flex-row w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">state</label>
                  <input
                    value={location?.state}
                    type="text"
                    placeholder="Enter Your State"
                    className=" p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">PostCode</label>
                  <input
                    value={location?.postcode}
                    type="text"
                    placeholder="Enter Your PostCode"
                    className=" p-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row  w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Country</label>
                  <input
                    value={location?.country}
                    type="text"
                    placeholder="Enter Your Country"
                    className=" p-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label htmlFor="">Phone No</label>
                  <input
                    value={form.phone}
                    onChange={(e) => {
                      setform({ ...form, phone: e.target.value });
                    }}
                    type="text"
                    placeholder="Enter Your Number"
                    className=" p-2 rounded-md"
                  />
                </div>
              </div>
              <button className="bg-red-500  text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                Submit
              </button>
              <div className="flex flex-col gap-3 items-center justify-center text-gray-700">
                -------OR--------
                <button
                  onClick={getlocation}
                  className="bg-red-500 cursor-pointer text-white px-3 py-2 rounded-md "
                >
                  Detect Location
                </button>
              </div>
            </div>
            <div className="bg-white border border-gray-300 shadow-xl rounded-md p-7 mt-1 space-y-3 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>
              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <LuNotebookText />
                  </span>
                  Items total
                </h1>
                <p>${displayprice}</p>
              </div>
              <div className="flex justify-between items-center ">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <MdDeliveryDining />
                  </span>
                  Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold ">
                  <span className="text-gray-600 line-through mr-1 "> $25</span>
                  FREE
                </p>
              </div>
              <div className="flex justify-between items-center ">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <span>
                    <GiShoppingBag />
                  </span>
                  Handling Charge
                </h1>
                <p className="text-red-500 font-semibold ">$5</p>
              </div>
              <hr className="text-gray-200 mt-2" />
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand total</h1>
                <p className="font-semibold text-lg">
                  ${(totalprice + 5).toFixed(2)}
                </p>
              </div>
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                  Apply promo Code
                </h1>
                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="p-2 rounded-md w-full border border-gray-500 outline-none "
                  />
                  <button className="bg-white text-black  border border-gray-200 px-4 py-1 rounded-md cursor-pointer ">
                    Apply
                  </button>
                </div>
              </div>
              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl ">
            Oh no! Your cart is empty
          </h1>
          <img className="w-[400px]" src={emptycart} alt="" />
          <button
            onClick={() => naviget("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer "
          >
            Continue shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
