"use client";
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useEffect,useState } from "react";
import { CartContext } from "./CartContext";


const StyledHeader = styled.header`
  background-color: #222;
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
  color:#aaa;
  text-decoration:none;
`;

const StyledNav = styled.nav`
  display:flex;
  gap: 15px;
  align-items:center;

  @media (max-width: 768px) {
  flex-direction: column;
`;

export default function Header() {
  const { cart } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => { 
    setIsMounted(true);
  }, []);

  return (
    <StyledHeader>
      <Center>
        <Wrapper>
          <Logo href={'/'}>
            <LogoImage src="/tncLogo.webp" alt="logo" />
             </Logo>
          <StyledNav>
            <NavLink href={'/'}>Home</NavLink>
            <NavLink href={'/products'}>All products</NavLink>
            <NavLink href={'/categories'}>Categories</NavLink>
            <NavLink href={'/account'}>Account</NavLink>
            <NavLink href={'/cart'}>Cart ({isMounted ? cart.length : '...'})</NavLink>
          </StyledNav>
       </Wrapper>  
      </Center>
    </StyledHeader>
  );
}