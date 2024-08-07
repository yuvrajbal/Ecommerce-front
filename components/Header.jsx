"use client";
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useEffect,useState } from "react";
import { CartContext } from "../src/app/cart/CartContext";
import SearchBar from './SearchBar';
import { set } from 'mongoose';


const StyledHeader = styled.header`
  background-color: #EBE4D4;
  // border: 4px solid pink;
  // position: sticky;
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
  padding: 1em 0.5em; 
  
`;

const NavLink = styled(Link)`
  color: black;
  text-decoration:none;
  svg{
    width:1.5rem;
  }
`;

const StyledNav = styled.nav`
  display:flex;
  gap: 0.7rem;
  align-items:center;


  @media (max-width: 768px) {
 
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

const SearchButton = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;

  svg{
    width:1.5rem;  
  }
  `;

const Menubutton = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;
  svg{
    width:1.5rem;
  }
  `;

const Left = styled.div`
  display:flex;
  gap: 0rem;
  `;


export default function Header() {
  const { cart } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  const [searchClicked, setSearchClicked] = useState(false);
  
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

  function handleSearchClick(){
    setSearchClicked(!searchClicked)
    setSearchVisible(true);
  }

  function handleSearchClose(){
    setSearchClicked(!searchClicked)
  }

  return (
    <>
    <StyledHeader>
      <Center>
        <Wrapper>

          {/* left side buttons */}
          <Left>
            <Menubutton>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </Menubutton>
            {/* search and cross button */}
            <SearchButton
              onClick = {()=> handleSearchClick()}
                
            >
              
              {searchClicked ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
          
            : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            )}
            

            </SearchButton>
            </Left>

          <Logo href={'/'}>
            <LogoImage src="/Tnc-logo.png" alt="logo" />
          </Logo>
            
          {/* right side nav Links */}
          <StyledNav>
            {/* <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink> */}

            <NavLink href={'/account'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            </NavLink>

            <NavLink href={'/cart'}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            ({isMounted ? calculateTotal(cart) : '...'})</NavLink>
          </StyledNav>
       </Wrapper>  
      </Center>
    </StyledHeader>
     {searchClicked && <SearchBar onClose={()=> null} />}
     </>
  );
}