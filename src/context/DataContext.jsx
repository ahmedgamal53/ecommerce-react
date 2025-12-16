/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useContext, useState } from "react";

export const DataContext = createContext(null);

export const Dataprovider = ({ children }) => {
  const [data, setdata] = useState();
  // fetching all products from api
  const fetchallproduct = async () => {
    try {
      const res = await axios.get(
        "https://dummyjson.com/products?limit=145&&select=title,price,images,category,description,brand,discountPercentage"
      );
      const productsdata = res.data.products;
      setdata(productsdata);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setdata,
        fetchallproduct,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
