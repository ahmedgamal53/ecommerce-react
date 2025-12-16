import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

const Category = () => {
  const { data } = useData();
  const navigate = useNavigate();
  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-8 items-center justify-around py-7 px-4">
        {[...new Set(data?.map((product) => product.category))]
          .slice(6, 12)
          .map((item, index) => (
            <div key={index}>
              <button
                onClick={() => navigate(`/category/${item}`)}
                className="uppercase bg-linear-to-r from-red-500  to-purple-500 text-white px-3 py-2 rounded-md cursor-pointer"
              >
                {item}
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Category;
