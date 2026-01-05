import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import axios from "axios";
import Footer from "./components/Footer";
import Singleproduct from "./pages/Singleproduct";
import Categoryproduct from "./pages/Categoryproduct";
import { Carts } from "./context/CartContent";
import Productroute from "./components/Productroute";
import Notfound from "./components/Notfound";

const App = () => {
  const [location, setlocation] = useState();
  const [opendropdown, setopendropdown] = useState(false);
  const getlocation = async () => {
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
      try {
        const location = await axios.get(url);
        const exactlocation = location.data.address;
        setlocation(exactlocation);
        setopendropdown(false);
        localStorage.setItem("location", JSON.stringify(exactlocation));
      } catch (error) {
        console.log(error);
      }
    });
  };

  useEffect(() => {
    const save = localStorage.getItem("location");
    if (save) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setlocation(JSON.parse(save));
    } else {
      getlocation();
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Navbar
          location={location}
          getlocation={getlocation}
          opendropdown={opendropdown}
          setopendropdown={setopendropdown}
        />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products" element={<Product />}></Route>
          <Route path="/products/:id" element={<Singleproduct />}></Route>
          <Route
            path="/category/:category"
            element={<Categoryproduct />}
          ></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/cart"
            element={
              <Productroute>
                <Cart location={location} getlocation={getlocation} />
              </Productroute>
            }
          ></Route>
          <Route path="*" element={<Notfound />}></Route>
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
