import React, { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Category from "./Category";
import { useNavigate } from "react-router-dom";
function Carousels() {
  const navigate = useNavigate();
  const { data, fetchallproduct } = useContext(DataContext);
  //   const [show, setshow] = useState(true);
  useEffect(() => {
    // console.log(data);
    fetchallproduct();
  }, []);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setshow(false);
  //     }, 1500);
  //   }, []);

  // if (!data) {
  //   return <div></div>;
  // }

  return (
    // <div>
    //   {show && (
    //     <div className=" min-h-screen md:min-h-[calc(100vh-60px)] flex justify-center items-center bg-linear-to-r  from-red-500 to-purple-500 text-white px-3 py-2  ">
    //       Loading...
    //     </div>
    //   )}
    //   {!show && (
    //     <div>
    //       <Swiper
    //         modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
    //         spaceBetween={50}
    //         slidesPerView={1}
    //         navigation
    //         pagination={{ clickable: true }}
    //         autoplay={{
    //           delay: 2500,
    //           disableOnInteraction: false,
    //         }}
    //         loop={true}
    //         //   onSwiper={(swiper) => console.log(swiper)}
    //         //   onSlideChange={() => console.log("slide change")}
    //       >
    //         {data?.slice(100, 103).map((item, index) => {
    //           return (
    //             <SwiperSlide key={index}>
    //               <div className=" min-h-screen md:min-h-[calc(100vh-150px)] flex justify-center items-center bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10">
    //                 <div className=" px-25 flex lg:gap-60 md:flex-row flex-col-reverse  justify-center items-center ">
    //                   <div className="">
    //                     <h3 className="text-red-500 font-semibold font-sans text-sm">
    //                       powering Your world with the Best in Electronics
    //                     </h3>
    //                     <h1 className=" mt-5 text-4xl font-bold uppercase line-clamp-3  md:w-[350px] text-white">
    //                       {item.title}
    //                     </h1>
    //                     <p className="mt-2 md:w-[400px]  line-clamp-3 text-gray-400 pr-7">
    //                       {item.description}
    //                     </p>
    //                     <button className="bg-linear-to-r my-10 from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer ">
    //                       Shop Now
    //                     </button>
    //                   </div>
    //                   <div>
    //                     <img
    //                       src={item.images}
    //                       alt={item.title}
    //                       className="rotating my-15 rounded-full md:w-[500px] w-[250px] shadow-2xl shadow-red-500 transition-all  hover:scale-105"
    //                     />
    //                   </div>
    //                 </div>
    //               </div>
    //             </SwiperSlide>
    //           );
    //         })}
    //       </Swiper>
    //       <Category />
    //     </div>
    //   )}
    // </div>

    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {data?.slice(100, 103).map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className=" min-h-screen md:min-h-[calc(100vh-140px)] flex justify-center items-center bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] -z-10">
                <div className=" px-25 flex lg:gap-60 md:flex-row flex-col-reverse  justify-center items-center ">
                  <div className="">
                    <h3 className="text-red-500 font-semibold font-sans text-sm">
                      powering Your world with the Best in Electronics
                    </h3>
                    <h1 className=" mt-5 text-4xl font-bold uppercase line-clamp-3  md:w-[350px] text-white">
                      {item.title}
                    </h1>
                    <p className="mt-2 md:w-[400px]  line-clamp-3 text-gray-400 pr-7">
                      {item.description}
                    </p>
                    <button
                      onClick={() => navigate(`/products/${item.id}`)}
                      className="bg-linear-to-r my-10 from-red-500 to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer "
                    >
                      Shop Now
                    </button>
                  </div>
                  <div>
                    <img
                      src={item.images}
                      alt={item.title}
                      className="rotating my-15 rounded-full md:w-[400px] w-[250px] shadow-2xl shadow-red-500 transition-all  hover:scale-105"
                    />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Category />
    </div>
  );
}

export default Carousels;
