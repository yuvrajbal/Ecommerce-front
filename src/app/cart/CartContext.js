"use client";

import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
const CartContext = createContext({});

function CartContextProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isCartInitialized, setIsCartInitialized] = useState(false);

  const { user, isLoaded } = useUser();
  const [isJustLoggedIn, setIsJustLoggedIn] = useState(false);
  async function fetchCartFromMetadata() {
    try {
      const response = await axios.get("/api/cart");
      return response.data.cart;
    } catch (error) {
      console.error("error fetching cart from metadata", error);
      return [];
    }
  }

  useEffect(() => {
    if (isCartInitialized && user) {
      localStorage.setItem("cart", JSON.stringify(cart));
      sendCartToServer(cart);
    }
  }, [cart, isCartInitialized, user]);

  useEffect(() => {
    async function intializeCart() {
      if (typeof window !== "undefined") {
        let cartData = [];
        const savedCart = localStorage.getItem("cart");
        console.log("saved cart", savedCart);
        if (savedCart) {
          console.log("cart from local storage", savedCart);
          cartData = JSON.parse(savedCart);
        }
        if (user) {
          const metadataCart = await fetchCartFromMetadata();
          console.log("cart from metadata", cartData);
          cartData = metadataCart;

          if (!isCartInitialized) {
            setIsJustLoggedIn(true);
          }
        }

        console.log("cart data", cartData);
        setCart(cartData);
        setIsCartInitialized(true);
      }
    }
    intializeCart();
  }, [user]);

  // function mergeCartData(localCart, metadataCart) {
  //   const mergedCart = [...localCart, ...metadataCart];
  //   const uniqueCart = mergedCart.reduce((acc, current) => {
  //     const x = acc.find(
  //       (item) =>
  //         item.productId === current.productId &&
  //         item.flavour === current.flavour &&
  //         item.weight === current.weight
  //     );
  //     if (!x) {
  //       return acc.concat([current]);
  //     } else {
  //       x.quantity += current.quantity;
  //       return acc;
  //     }
  //   }, []);
  //   return uniqueCart;
  // }

  // send cart to server when user logs in
  useEffect(() => {
    if (isJustLoggedIn && cart.length > 0) {
      sendCartToServer(cart);
      setIsJustLoggedIn(false);
    }
  }, [isJustLoggedIn, cart]);

  async function sendCartToServer(cartData) {
    try {
      const response = await axios.post("/api/cart", cartData);
      console.log("response", response.data);
      console.log("Sent cart items to the server");
    } catch (error) {
      console.error("error updating cart on server", error);
    }
  }

  function addProduct(
    productId,
    flavour,
    weight,
    quantity,
    price,
    title,
    imageLink,
    originalPrice
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
          quantity: updatedCart[existingProductIndex].quantity + quantity,
        };
        return updatedCart;
      } else {
        return [
          ...prevCart,
          {
            productId,
            flavour,
            weight,
            quantity,
            price,
            title,
            imageLink,
            originalPrice,
          },
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
    return cart;
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

  function clearCart() {
    setCart([]);
  }

  if (!isCartInitialized) {
    // Render a loading state until the cart is initialized to prevent hydration errors
    return null;
  }
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addProduct,
        removeProduct,
        decreaseProductCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };
