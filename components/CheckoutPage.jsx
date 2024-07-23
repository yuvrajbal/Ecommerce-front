"use client";

import React, {useEffect, useState} from "react";
import {useStripe,useElements,PaymentElement,} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import styled from "styled-components";
import { set } from "mongoose";

const StyledForm = styled.form`
  max-width: 90%;
  margin: 0 auto;
  margin-top: 2em;
`;


const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: black;
  width: 100%;
  border: none;
  border-radius: 0.25rem;
  color:white;
  cursor: pointer;
  text-transform: uppercase;
  margin-top: 1em;
`;

const CheckoutPage = ({amount, clientSecret}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage,setErrorMessage] = useState("");
  // const [clientSecret,setClientSecret] = useState("");  
  const [loading,setLoading] = useState(false); 

  // useEffect(() => {
  //   const createPaymentIntent = async () => {
  //     try {
  //       const response = await fetch("/api/create-payment-intent", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
  //       });
  //       const data = await response.json();
  //       setClientSecret(data.clientSecret);
  //     } catch (error) {
  //       setErrorMessage("Failed to create payment intent. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   createPaymentIntent();
  // }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
   
    
    if (!stripe || !elements) {
      return;
    }
    setLoading(true);
    const {submitError} = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
  

  const {error} = await stripe.confirmPayment({
    elements,
    clientSecret,
    confirmParams:{
      return_url: `http://localhost:3001/payment-success?amount=${amount}`,
    },
  })

  if (error){
    setErrorMessage(error.message);
   
  }
  else{
    // going to return url
  }
  setLoading(false);

}; 

  if(!clientSecret || !stripe || !elements){
    return <div>Loading...</div>}

  return (
    <StyledForm onSubmit={handleSubmit} >
      {clientSecret && <PaymentElement/>}
      {errorMessage && <div>{errorMessage}</div>}
      <StyledButton 
        disabled = {!stripe || loading}
        >
          
        {!loading ? `Pay INR ${amount}` : "Processing..."}
        
      </StyledButton>
    </StyledForm>
  );

}

export default CheckoutPage;