"use client";
import Center from "../../../components/Center";
import styled from "styled-components";
import { CartContext } from "./CartContext";
import { useContext, useState, useEffect } from "react";
import CartItem from "./CartItem";
import axios from "axios";
import Link from "next/link";
import Recommendations from "./Recommendations";
import { useUser } from "@clerk/nextjs";
const CartHeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 1em;
  margin: 1em 0;
  @media (min-width: 668px) {
    flex-direction: row;
    margin: 1em 3em;
  }
`;
const CartHeading = styled.h1`
  font-family: Apparel;
  padding: 0;
  margin: 0;
  font-size: 1.8rem;
`;

const CheckoutButton = styled(Link)`
  background-color: #222;
  color: white;
  text-transform: uppercase;
  display: flex;
  font-family: Roboto;
  padding: 0.5em 1em;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  svg {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5em;
  }
  img {
    height: 1.5rem;
    margin-right: 0.5em;
  }

  @media (min-width: 668px) {
    width: auto;
  }
`;

const PaypalButton = styled(Link)`
  display: flex;
  font-family: Roboto;
  background-color: white;
  padding: 0.5em 1em;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  font-style: italic;
  font-weight: 600;
  margin-top: 2em;
  border: 1px solid #333;
  svg {
    height: 1.5rem;
    width: 1.5rem;
    margin-right: 0.5em;
  }

  @media (min-width: 668px) {
    width: auto;
  }
`;

const GpayButton = styled(Link)`
  display: flex;
  font-family: Roboto;
  background-color: white;
  color: #333;
  padding: 0.5em 1em;
  justify-content: center;
  align-items: center;
  width: 85%;
  margin: 0 auto;
  font-weight: 500;
  margin-top: 2em;
  border: 1px solid #333;

  img {
    height: 1.5rem;
    margin-right: 0.5em;
  }

  @media (min-width: 668px) {
    width: auto;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  // border: 2px solid blue;
  margin: 2em 0em;
  justify-content: center;
  @media (min-width: 668px) {
    flex-direction: row;
  }
`;
const CartContainer = styled.div`
  padding: 0;
  width: 100%;
  @media (min-width: 668px) {
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
  @media (min-width: 668px) {
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
  margin-top: 1em;
`;

const Giftbutton = styled.button`
  display: flex;
  gap: 1em;
  img {
    width: 100px;
    height: 100px;
  }
`;

const DiscountCodeContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 auto;
`;

const DiscountButton = styled.button`
  background-color: white;
  color: #003942;
  border: 1px solid #003942;
  border-radius: 3px;
  text-transform: uppercase;
  padding: 0.5em 1em;
`;

const Styledinput = styled.input`
  font-size: 1rem;
  padding: 0.5em 0.5em;
  border: 2px solid gray;
  border-radius: 3px;
`;

const EmptyCartContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid #ddd;
  margin-top: 2em;
  padding: 1em 0;
  // border: 1px solid pink;
`;

const Styledh2 = styled.h2`
  font-family: Roboto;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;
`;

const NavToMainButton = styled(Link)`
  background-color: white;
  color: #003942;
  font-family: Roboto;
  font-size: 1rem;
  text-transform: uppercase;
  padding: 0.5em 0;
  width: 85%;
  text-align: center;
  margin: 1em auto;
  text-decoration: none;
  border: 1px solid #003942;
  padding: 0.5em 1em;
`;

const TotalAmountContainer = styled.div`
  background-color: #f2f2f2;
  font-family: Figtree;
  font-size: 1.2rem;
  line-height: 1.6rem;
  font-weight: 500;
  color: #333333;
  margin: 2em 0.2em;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1em 1em;
`;

const TotalColumn = styled.div``;

const SavingsContainer = styled.div`
  border-top: 1px solid #ddd;
`;

const Pay = styled.div`
  color: #003087;
`;

const Pal = styled.span`
  color: #009cde;
`;

export default function Cart() {
  const { cart } = useContext(CartContext);

  // let originalTotal,
  //   CartTotal = calculateTotal();

  // console.log("cart total", CartTotal);
  console.log("cart items from context", cart);
  // const [cartItems, setCartItems] = useState([]);
  const [giftSelected, setGiftSelected] = useState(false);
  const isEmpty = cart?.length === 0;
  const [discount, setDiscount] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const [totals, setTotals] = useState({ total: 0, originalTotal: 0 });

  async function sendCartItems() {
    try {
      const response = await axios.post("/api/cart", cart);
      console.log("response", response.data);
      // setCartItems(response.data);
      // }
    } catch (error) {
      console.error(error);
    }
  }

  // calculate total and original total
  function calculateTotal() {
    let total = 0;
    let originalTotal = 0;
    for (const product of cart) {
      total += product.price * product.quantity;
      originalTotal += product.originalPrice * product.quantity;
    }
    // console.log("total", total);
    // console.log("original total", originalTotal);
    return { total, originalTotal };
  }

  // find total and orginal total when cart changes
  useEffect(() => {
    const { total, originalTotal } = calculateTotal();
    setTotals({ total, originalTotal });
    console.log("totals", totals);
  }, [cart]);

  const { user } = useUser();
  console.log("user", user);
  return (
    <>
      <Center>
        {/* Heading and checkout button */}
        <CartHeadingContainer>
          <CartHeading>Your Shopping Cart</CartHeading>

          {!isEmpty && (
            <CheckoutButton onClick={() => sendCartItems()} href={"/checkout"}>
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
          )}
        </CartHeadingContainer>

        {isEmpty ? (
          <EmptyCartContainer>
            <Styledh2>There are currently no items in your basket.</Styledh2>
          </EmptyCartContainer>
        ) : (
          <FlexContainer>
            <CartContainer>
              {/* cart table that sends req to /api/cart */}
              <CartItem />
            </CartContainer>

            {/* Gifts */}
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
        )}

        {/* Discount code */}
        {!isEmpty && (
          <DiscountCodeContainer>
            <Styledinput
              type="text"
              placeholder="Got a discount code? Enter it"
              value={discount}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <DiscountButton>Use Code</DiscountButton>
          </DiscountCodeContainer>
        )}

        {/* Cart total */}
        {!isEmpty && (
          <TotalAmountContainer>
            <TotalRow>
              <TotalColumn>Cart Subtotal:</TotalColumn>

              <TotalColumn>INR {totals.total}</TotalColumn>
            </TotalRow>

            <SavingsContainer>
              <TotalRow>
                <TotalColumn>Total saving from MRP</TotalColumn>

                <TotalColumn>
                  {Number(totals.originalTotal) - Number(totals.total)} INR{" "}
                </TotalColumn>
              </TotalRow>

              <TotalRow>
                <TotalColumn>Additional saving</TotalColumn>

                <TotalColumn>INR </TotalColumn>
              </TotalRow>
            </SavingsContainer>
          </TotalAmountContainer>
        )}

        {/* Checkout buttons */}
        {!isEmpty && (
          <>
            <CheckoutButton onClick={() => sendCartItems()} href={"/checkout"}>
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

            <PaypalButton onClick={() => sendCartItems()} href={"/checkout"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="PayPal"
                role="img"
                viewBox="0 0 512 512"
                fill="#000000"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <rect width="512" height="512" rx="15%" fill="#ffffff"></rect>
                  <path
                    fill="#002c8a"
                    d="M377 184.8L180.7 399h-72c-5 0-9-5-8-10l48-304c1-7 7-12 14-12h122c84 3 107 46 92 112z"
                  ></path>
                  <path
                    fill="#009be1"
                    d="M380.2 165c30 16 37 46 27 86-13 59-52 84-109 85l-16 1c-6 0-10 4-11 10l-13 79c-1 7-7 12-14 12h-60c-5 0-9-5-8-10l22-143c1-5 182-120 182-120z"
                  ></path>
                  <path
                    fill="#001f6b"
                    d="M197 292l20-127a14 14 0 0 1 13-11h96c23 0 40 4 54 11-5 44-26 115-128 117h-44c-5 0-10 4-11 10z"
                  ></path>
                </g>
              </svg>
              <Pay>
                Pay<Pal>Pal</Pal>
              </Pay>
            </PaypalButton>

            <GpayButton onClick={() => sendCartItems()} href={"/checkout"}>
              <img src="google.svg" alt="" />
              Pay
            </GpayButton>
          </>
        )}

        {/* Main menu button */}
        <EmptyCartContainer>
          <NavToMainButton href={"/"}>Continue Shopping</NavToMainButton>
        </EmptyCartContainer>

        {/* Recommendations */}
        <Recommendations />
      </Center>
    </>
  );
}
