"use client";
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useEffect,useState } from "react";
import { CartContext } from "../src/app/cart/CartContext";
import SearchBar from './SearchBar';


const StyledHeader = styled.header`
  background-color: #EBE4D4;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration:none
  `
  ;

const LogoImage = styled.img`
  max-width: 100px;
`;

const Wrapper = styled.div`
  display:flex;
  justify-content:space-between; 
  padding: 1em 2em; 
  
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration:none;
`;

const StyledNav = styled.nav`
  display:flex;
  gap: 15px;
  align-items:center;


  @media (max-width: 768px) {
  flex-direction: column;
`;

const InputContainer = styled.div`  
  display: flex;
  border-radius:1rem;
  `;



const StyledInput = styled.input`
 border:none;
 border-radius:1rem 0 0 1rem;

 `;

 


const StyledButton = styled.button`
  background-color: white;
  border-radius: 0 1rem 1rem 0;
  border:none;

  `;

export default function Header() {
  const { cart } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  const [search, setSearch] = useState("");
  
  useEffect(() => { 
    setIsMounted(true);
  }, []);

  
  function calculateTotal(cart) {
    let total = 0;
    if (cart && cart.length > 0) {
      for (const product of cart) {
        total +=  product.quantity;
      }
    }
  
    return total;
  }


  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>
            <LogoImage src="/Tnc-logo.png" alt="logo" />
             </Logo>
            <SearchBar />
            
            
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({isMounted ? calculateTotal(cart) : '...'})</NavLink>
          </StyledNav>
       </Wrapper>  
      </Center>
    </StyledHeader>
  );
}