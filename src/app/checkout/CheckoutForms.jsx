"use client";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { CartContext } from "../../../components/CartContext";
import axios from "axios";
import convertToSubcurrency from "../../../lib/convertToSubcurrency";
import CheckoutPage from "../../../components/CheckoutPage";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { set } from "mongoose";

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: black;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  color: #fff;
  text-transform: uppercase;
`;

const FormContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

const FormTitle = styled.h2`
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1.8em;
`;

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  font-family: gotham;
  color: #333;
`;

if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined");
}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function CheckoutForms() {
   
  let [postResponse, setPostResponse] = useState({});
  const [goToPayment, setGoToPayment] = useState(false);
  const [CartTotal , setCartTotal] = useState(0);
  const [clientSecret,setClientSecret] = useState(""); 

  function calculateTotal(order) {
    const lineItems = order.line_items;
    let totalPrice = 0;
  
    lineItems?.forEach(item => {
      const unitPrice = item.price_data.unit_amount;
      const quantity = item.quantity;
      totalPrice += unitPrice ;
    });
  
    return totalPrice;
  }

  function Address() {
    const statesInIndia = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Lakshadweep",
      "Delhi",
      "Puducherry",
      "Ladakh",
      "Jammu and Kashmir",
    ];

    const [formData, setFormData] = useState({
      email: "",
      country: "India",
      name: "",
      zipcode: "",
      street: "",
      city: "",
      state: "",
      number: "",
      products: useContext(CartContext).cart.join(","),
    });

    // update the state when the input value changes
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };

    // send the form data to the server
    async function handleSubmit(e) {
      e.preventDefault();
      try {
        let response = await axios.post("/api/checkout", formData);
        setPostResponse(response.data);
        // await axios.post ("/api/orders")
        console.log("response from post request",response.data);
        const total = calculateTotal(response.data);
        setCartTotal(total);
        setGoToPayment(true);
      } catch (error) {
        console.error(error);
      }
    }

    return (
      <FormContainer>
        <FormTitle>1. Email and delivery address</FormTitle>
        <form onSubmit={handleSubmit}>
        <StyledField>
          <StyledLabel htmlFor="email">*Email address</StyledLabel>
          <StyledInput
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            
          />
        </StyledField>

        <StyledField>
          <StyledLabel htmlFor="country">*Country</StyledLabel>
          <StyledSelect
            id="country"
            value={formData.country}
            onChange={handleChange}
            disabled
          >
            <option value="India">India</option>
            <option value="Canada">Canada</option>
            <option value="Dubai">Dubai</option>
          </StyledSelect>
        </StyledField>

        <StyledField>
          <StyledLabel htmlFor="name">*Full Name</StyledLabel>
          <StyledInput
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </StyledField>

        <StyledField>
          <StyledLabel htmlFor="zipcode">*Postal Code/Zip</StyledLabel>
          <StyledInput
            type="text"
            id="zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
          />
        </StyledField>

        <StyledField>
          <StyledLabel htmlFor="street">*Address(Street)</StyledLabel>
          <StyledInput
            type="text"
            name="street"
            id="street"
            value={formData.street}
            onChange={handleChange}
            required
          />
        </StyledField>

        <StyledField>
          <StyledLabel htmlFor="city">*City</StyledLabel>
          <StyledInput
            type="text"
            name="city"
            id="city"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </StyledField>

        <StyledField>
          <StyledLabel htmlFor="state">*State</StyledLabel>
          <StyledSelect
            name="state"
            id="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select a state</option>
            {statesInIndia.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </StyledSelect>
        </StyledField>

        <StyledField>
          <StyledLabel htmlFor="number">*Contact Number</StyledLabel>
          <StyledInput
            type="number"
            name="number"
            id="number"
            value={formData.number}
            onChange={handleChange}
            required
          />
        </StyledField>

        <StyledButton type="submit">Continue</StyledButton>
        </form>
      </FormContainer>
    );
  }


  useEffect(() =>{
    console.log("set go to payment",goToPayment);
  },[goToPayment])

  useEffect(() =>{
    console.log("Cart total updated to",CartTotal);
  
  },[CartTotal])

  // const amount = 50;
  // console.log("amount",amount);

  useEffect(() => {
    if(goToPayment && CartTotal > 0){
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: convertToSubcurrency(CartTotal) }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("client secret", data.clientSecret);
          setClientSecret(data.clientSecret);
        });
    }} , [goToPayment,CartTotal]);

  
  return (
    <div>
      <Address />
  
      {goToPayment && (
        <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(CartTotal),
          currency: "inr",
        }}
      >
        <CheckoutPage amount={CartTotal}  clientSecret ={clientSecret} />
      </Elements>  
      )}
      
  
    </div>
  );
}
