import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const CartDataProvider = ({ children }) => {
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const existingItems = localStorage.getItem("cart");
    if (existingItems) setCartData(JSON.parse(existingItems));
  }, []);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => useContext(CartContext);

export { useCartContext, CartDataProvider };
