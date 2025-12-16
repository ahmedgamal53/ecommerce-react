import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartitem, setcartitem] = useState(() => {
    const stored = localStorage.getItem("caritem");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("caritem", JSON.stringify(cartitem));
  }, [cartitem]);

  const addtocart = (product) => {
    const itemincart = cartitem.find((item) => item.id === product.id);
    if (itemincart) {
      const updatedcart = cartitem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setcartitem(updatedcart);
      toast.success("Product quantity increased! ");
    } else {
      setcartitem([...cartitem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart!");
    }
  };

  const updatequantity = (productid, action) => {
    setcartitem(
      cartitem
        .map((item) => {
          if (item.id === productid) {
            let newunit = item.quantity;
            if (action === "increase") {
              newunit += 1;
              toast.success("Quantity is increased!");
            } else if (action === "decrease") {
              newunit -= 1;
              toast.error("Quantity is decrease!");
            }
            return newunit > 0 ? { ...item, quantity: newunit } : null;
          }
          return item;
        })
        .filter((item) => item != null) //remove item quantity=0
    );
  };

  const deletitem = (productid) => {
    setcartitem(cartitem.filter((item) => item.id != productid));
    toast.error("product is deleted from cart!");
  };

  return (
    <CartContext.Provider
      value={{
        cartitem,
        setcartitem,
        addtocart,
        updatequantity,
        deletitem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const Carts = () => useContext(CartContext);
