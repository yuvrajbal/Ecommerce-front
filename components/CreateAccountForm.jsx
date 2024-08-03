"use client";
import styled from "styled-components"
import Center from "./Center";
import { useState } from "react";
import axios from "axios"; 
import { useRouter } from "next/navigation";
const SocialsContainer = styled.div`
  display: flex;
  gap: 1em;
  `;

const StyledButton = styled.button`
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;


  img{
   height: 1.5rem;
   margin-right: 0.5em;}

`;

const FormContainer = styled.div`
  margin: 0 auto;
`;

const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
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

const StyledInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  margin-bottom: 0.5rem;
  border-radius: 0.25rem;
  box-sizing: border-box;
`;

const PasswordWarning = styled.div`
  color:red;
  background-color:#FAE8E6; 
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: solid 1px red;
 
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 10px;
`;
export default function CreateAccountForm() {
  const [formError, setFormError] = useState(false);
  const [wrongPassword, setWrongPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    number: "",
    referral: "",

  })
  const router = useRouter();


  const handleChange = (event) => {
    setFormError('');
    const {name,value } = event.target;
    setFormData({
      ...formData,
      [name]:value
    });
  }

  const handlePasswordConfirm = (event) => {
    event.preventDefault();
    if (formData.password !== event.target.value) {
      console.log("Passwords do not match");
      setWrongPassword(true);

    }
    else{
      setWrongPassword(false);
    }
  }

  function goBack(){
    router.push("/");
  }
  async function handleSubmit(event) {
    event.preventDefault();
    if (wrongPassword) {
      setFormError("Passwords do not match");
      // alert("Passwords do not match");
      return;
    }

    try{
      const response = await axios.post("/api/create-account", formData);
      console.log(response);
      setFormError("Account created successfully");
      goBack();
    } catch(error){
      if (error.response ){
        setFormError(error.response.data.error);
      }
      else{
        setFormError("An error occured. Try again");
      }
      console.error("Error creating account", error);

    }
    // console.log(formData);
  }
  
  return (
    <Center>
    <h1>About You</h1>

    <h2>Sign up with</h2>
    <SocialsContainer>
      <StyledButton>
        <img src="facebook.png" alt="facebook" />
        Facebook</StyledButton>
      <StyledButton>
        <img src="google.svg" alt="google" />
        Google</StyledButton>

    </SocialsContainer>

    <FormContainer>
        <FormTitle>Or create an email account</FormTitle>
        {formError && <ErrorMessage>{formError}</ErrorMessage>}
        <form onSubmit={handleSubmit}>


           {/* full name */}
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

          {/* password */}
          <StyledField>
            <StyledLabel htmlFor="password">*Password</StyledLabel>
            <StyledInput
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </StyledField>

          {/* confirm password */}
          <StyledField>
            <StyledLabel htmlFor="confirmPassword">*Confirm Password</StyledLabel>
            <StyledInput
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              // onChange={handlePasswordConfirm}
              // onSubmit={handlePasswordConfirm}
              onBlur={handlePasswordConfirm}
              required
            />
            {wrongPassword && <PasswordWarning>Password must match</PasswordWarning>}

          </StyledField>
          




          {/* contact number */}
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

           {/* Referal code*/}
           <StyledField>
            <StyledLabel htmlFor="referral">Referral Code</StyledLabel>
            <StyledInput
              type="text"
              name="referral"
              id="referral"
              value={formData.referral}
              onChange={handleChange}
              
            />
          </StyledField>



        <StyledButton type="submit">Continue</StyledButton>
        </form>
      </FormContainer>

    </Center>
  )
  
  
}