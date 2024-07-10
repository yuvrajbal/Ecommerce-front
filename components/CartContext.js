import { set } from "mongoose";
import { createContext, useEffect, useState } from "react";

const CartContext = createContext({});

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartInitialized, setIsCartInitialized] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setIsCartInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (isCartInitialized) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isCartInitialized]);

  function addProduct(productId) {
    setCart((prev) => [...prev, productId]);
    console.log("added product", cart);
  }
  function removeProduct(productId) {
    setCart((prev) => prev.filter((id) => id !== productId));
    console.log("removed product", cart);
  }

  function decreaseProductCount(productId) {
    setCart((prev) => {
      const index = prev.indexOf(productId);
      if (index > -1) {
        prev.splice(index, 1);
      }
      return [...prev];
    });
  }

  if (!isCartInitialized) {
    // Render a loading state until the cart is initialized to prevent hydration errors
    return null;
  }
  return (
    <CartContext.Provider
      value={{ cart, setCart, addProduct, removeProduct, decreaseProductCount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };
