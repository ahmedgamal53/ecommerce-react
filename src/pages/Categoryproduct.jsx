import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import loading from "../assets/src_assets_Loading4.webm";
import { ChevronLeft } from "lucide-react";
import Productlist from "../components/Productlist";
import { useState, useEffect } from "react";
const Categoryproduct = () => {
  const [searchdata, setsearchdata] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const category = params.category;

  const getfilterdata = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = res.data.products;
      console.log(res);
      setsearchdata(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getfilterdata();
  }, []);

  return (
    <div>
      {/* {data?.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center"
          >
            <ChevronLeft /> Back
          </button>
          {data
            .filter((item) => item.category === category)
            .map((product, index) => (
              <Productlist key={index} product={product} />
            ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )} */}
      {searchdata?.length > 0 ? (
        <div className="max-w-6xl mx-auto mt-10 mb-10 px-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center"
          >
            <ChevronLeft /> Back
          </button>
          {searchdata.map((product, index) => (
            <Productlist key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[400px]">
          <video muted autoPlay loop>
            <source src={loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Categoryproduct;
