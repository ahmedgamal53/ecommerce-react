import { Link, NavLink } from "react-router-dom";

const Midbanner = () => {
  return (
    <div className=" bg-gray-100  md:py-24  ">
      <div
        className=" relative max-w-7xl mx-auto  pt-28  h-[550px] md:h-[600px]"
        style={{
          backgroundImage:
            "url(https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/1.webp)",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60  md:rounded-2xl bg-opacity-50 flex justify-center items-center">
          <div className="text-center text-white px-4">
            <h2 className="text-3xl md-text-5xl lg:text-6xl font-bold mb-4">
              Next-Gen Electronics at Your Fingertips
            </h2>
            <p className="text-lg md:text-xl mb-6">
              Discover the latest tech innovations with unbeatable prices and
              free shipping on all orders.
            </p>
            <Link to={"/products"}>
              <button className="bg-red-500 hover:bg-red-600 font-semibold px-4 py-2 md:py-3 md:px-6  rounded-lg transition duration-300 text-white cursor-pointer">
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Midbanner;
