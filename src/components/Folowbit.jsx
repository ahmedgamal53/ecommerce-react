import { Carousel } from "flowbite-react";
import { useContext, useEffect } from "react";
import { DataContext } from "../context/DataContext";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default function Component() {
  const { data, fetchallproduct } = useContext(DataContext);
  useEffect(() => {
    console.log(data);
    fetchallproduct();
  }, []);

  return (
    <div>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
      >
        {data?.slice(100, 105)?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <div className="min-h-[calc(100vh-150px)] p- flex justify-center items-center bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">
                <div className="flex justify-center items-center gap-40">
                  <div>
                    <h3>Powring Your with the best in elctronic</h3>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                  </div>
                  <div>
                    <img src={item.images} alt="" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
