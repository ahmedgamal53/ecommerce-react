import React, { useEffect } from "react";
import Carousel from "../components/Carousel";
import Midbanner from "../components/Midbanner";
import Features from "../components/Features";
import { useData } from "../context/DataContext";
import loading from "../assets/src_assets_Loading4.webm";
const Home = () => {
  const { data, fetchallproduct } = useData();

  useEffect(() => {
    fetchallproduct();
  }, []);

  return (
    // <div>
    //   <Carousel />
    //   <Midbanner />
    //   <Features />
    // </div>

    <div>
      {data?.length > 0 ? (
        <div className="overflow-x-hidden">
          <Carousel />
          <Midbanner />
          <Features />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <video muted autoPlay loop>
            <source src={loading} />
          </video>
        </div>
      )}
    </div>
  );
};
//
export default Home;
