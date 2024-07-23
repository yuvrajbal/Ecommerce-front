import { createContext, useEffect, useState } from "react";

const CartContext = createContext({});

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartInitialized, setIsCartInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      console.log("saved cart", savedCart);
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

  function addProduct(
    productId,
    flavour,
    weight,
    quantity,
    price,
    title,
    imageLink
  ) {
    setCart((prevCart) => {
      // update count if exact product already exists in cart
      const existingProductIndex = prevCart.findIndex(
        (item) =>
          item.productId === productId &&
          item.flavour === flavour &&
          item.weight === weight
      );

      if (existingProductIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex] = {
          ...updatedCart[existingProductIndex],
          quantity: updatedCart[existingProductIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          { productId, flavour, weight, quantity, price, title, imageLink },
        ];
      }
    });
  }

  function removeProduct(productId, flavour, weight, quantity, price) {
    setCart((prev) =>
      prev.filter(
        (item) =>
          item.productId !== productId ||
          item.flavour !== flavour ||
          item.weight !== weight
      )
    );
    console.log("removed product", cart);
  }

  function decreaseProductCount(productId, flavour, weight, quantity, price) {
    setCart((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.productId === productId &&
          item.flavour === flavour &&
          item.weight === weight
      );
      if (index != -1) {
        const updatedCart = [...prev];
        updatedCart[index] = {
          ...updatedCart[index],
          quantity: updatedCart[index].quantity - 1,
        };

        if (updatedCart[index].quantity <= 0) {
          updatedCart.splice(index, 1);
        }
        return updatedCart;
      }
      return prev;
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
