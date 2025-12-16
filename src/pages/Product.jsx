import React, { useEffect, useState } from "react";
import { useData } from "../context/DataContext";
import loading from "../assets/src_assets_Loading4.webm";
import Productcard from "../components/Productcard";
import Filtersection from "../components/Filtersection";
import Pagination from "../components/pagination";
import Lottie from "lottie-react";
import { Player } from "@lottiefiles/react-lottie-player";
import notfound from "../assets/notfound.json";
import Mobilefilter from "../components/Mobilefilter";
const Product = () => {
  const { data, fetchallproduct } = useData();
  const [search, setsearch] = useState("");
  const [category, setcategory] = useState("All");
  const [brand, setbrand] = useState("All");
  const [pricerange, setpricerange] = useState([0, 5000]);
  const [page, setpage] = useState(1);
  const [openfilter, setopenfilter] = useState(false);
  const pagehandeler = (selectpage) => {
    setpage(selectpage);
    window.scrollTo(0, 0);
  };

  const filtereddata = data?.filter(
    (item) =>
      item.title?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      (brand === "All" || item.brand === brand) &&
      item.price >= pricerange[0] &&
      item.price <= pricerange[1]
  );

  const dynamicpage = Math.ceil(filtereddata?.length / 8);

  useEffect(() => {
    fetchallproduct();
  }, []);
  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <Mobilefilter
          openfilter={openfilter}
          setopenfilter={setopenfilter}
          search={search}
          setsearch={setsearch}
          brand={brand}
          setbrand={setbrand}
          pricerange={pricerange}
          setpricerange={setpricerange}
          category={category}
          setcategory={setcategory}
        />
        {data?.length > 0 ? (
          <>
            <div className="flex items-start gap-8">
              <Filtersection
                search={search}
                setsearch={setsearch}
                brand={brand}
                setbrand={setbrand}
                pricerange={pricerange}
                setpricerange={setpricerange}
                category={category}
                setcategory={setcategory}
              />
              {filtereddata?.length > 0 ? (
                <div className="flex justify-center items-center flex-col">
                  <div className=" grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-7 mt-10 h-max">
                    {filtereddata
                      ?.slice(page * 8 - 8, page * 8)
                      .map((product, index) => {
                        return <Productcard key={index} product={product} />;
                      })}
                  </div>
                  <Pagination
                    pagehandeler={pagehandeler}
                    page={page}
                    dynamicpage={dynamicpage}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center h-screen mx-auto mt-10">
                  <Player
                    autoplay
                    loop
                    src={notfound}
                    className="md:w-[500px]"
                  />
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-[400px]">
            <video muted autoPlay loop>
              <source src={loading} type="video/webm" />
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Product;
