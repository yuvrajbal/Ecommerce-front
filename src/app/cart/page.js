"use client";
import Center from "../../../components/Center";
import styled from "styled-components";
import { CartContext } from "../../../components/CartContext";
import { useContext, useState, useEffect } from "react";
import CartItem from "./CartItem";
import axios from "axios";

const CartHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin: 1em 0;
  @media (min-width: 768px) {
    flex-direction: row;
    margin: 1em 3em;
  }
`;
const CartHeading = styled.h1`
  font-family: Apparel;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
`;

const CheckoutButton = styled.button`
  background-color: #222;
  color: white;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  font-family: Roboto;
  padding: 0.5em 1em;
  svg {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5em;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  // border: 2px solid blue;
  margin: 2em 0em;
  justify-content: center;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const CartContainer = styled.div`
  padding: 0;
  // border: 2px solid pink;
  width: 100%;
  @media (min-width: 768px) {
    padding: 0 2em;
  }
`;

const GiftContainer = styled.div`
  background-color: #f2f2f2;
  padding: 0 1.2em;

  height: 100%;
  width: 80%;
  margin: 0 auto;
  margin-top: 2em;
  // border: 1px solid #ddd
  @media (min-width: 768px) {
    width: 40%;
    margin-right: 2em;
  }
`;

const GiftHeading = styled.h3`
  font-family: Roboto;
  font-size: 1.2rem;
  margin: 1em 0;
`;
const GiftQualification = styled.div`
  margin-top: 2em;
  display: flex;
  color: green;
  svg {
    height: 1.2rem;
    width: 1.2rem;
  }
`;
const GiftCount = styled.div`
  margin-top: 1em;
`;

const GiftButtonContainer = styled.div`
  display: flex;
`;

const Giftbutton = styled.button`
  display: flex;
  img {
    width: 100px;
    height: 100px;
  }
`;

const DiscountCodeContainer = styled.div`
  display: flex;
  max-width: 60%;
  border: 1px solid red;
  justify-content: right;
`;

const DiscountButton = styled.button`
  background-color: white;
  color: #003942;
  border: 1px solid #003942;
  border-radius: 3px;
  text-transform: uppercase;
`;

const Styledinput = styled.input`
  font-size: 1rem;
  padding: 0.5em 0.5em;
  border: 2px solid gray;
  border-radius: 3px;
`;

export default function Cart() {
  const { cart } = useContext(CartContext);
  console.log("cart items from context", cart);
  const [cartItems, setCartItems] = useState([]);
  const [giftSelected, setGiftSelected] = useState(false);

  async function sendCartItems() {
    try {
      // if (cart.length > 0) {
      const response = await axios.post("/api/cart", { ids: cart });
      console.log("response", response.data);
      setCartItems(response.data);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    sendCartItems();
  }, [cart]);

  return (
    <Center>
      <CartHeadingContainer>
        <CartHeading>Your Shopping Cart</CartHeading>
        <CheckoutButton>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clipRule="evenodd"
            />
          </svg>
          Checkout Securely Now
        </CheckoutButton>
      </CartHeadingContainer>
      <FlexContainer>
        <CartContainer>
          {cartItems.length ? (
            <CartItem products={cartItems} ids={cart} />
          ) : (
            <h3>Your cart is empty</h3>
          )}
        </CartContainer>

        <GiftContainer>
          <GiftHeading> Free Gift </GiftHeading>
          <div>Enjoy free gifts with your purchase!</div>
          <GiftQualification>
            Qualified
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </GiftQualification>

          <GiftCount>
            {giftSelected ? 1 : 0}
            /1 free gifts selected
          </GiftCount>

          <GiftButtonContainer>
            <Giftbutton>
              <img src="gift.jpg" alt="" />
              <div>TNC Duffel Bag</div>
            </Giftbutton>
          </GiftButtonContainer>
        </GiftContainer>
      </FlexContainer>

      <DiscountCodeContainer>
        <Styledinput type="text" placeholder="Got a discount code? Enter it" />
        <DiscountButton>Use Code</DiscountButton>
      </DiscountCodeContainer>
    </Center>
  );
}
