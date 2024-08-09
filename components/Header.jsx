"use client";
import Link from 'next/link';
import styled from 'styled-components';
import Center from './Center';
import { useContext, useEffect,useState } from "react";
import { CartContext } from "../src/app/cart/CartContext";
import SearchBar from './SearchBar';
import { set } from 'mongoose';
import "../src/app/globals.css";
import Overlay from './Overlay';

const StyledHeader = styled.header`
  background-color: #EBE4D4;
  position: fixed;
  width: 100%;
  // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 800; 
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

 


// const StyledButton = styled.button`
//   background-color: white;
//   border-radius: 0 1rem 1rem 0;
//   border:none;

//   `;

const SearchButton = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;

  svg{
    width:1.5rem;  
  }
  `;

const StyledButton = styled.button`
  background-color: transparent;
  border:none;
  cursor: pointer;
  margin:0em;
  padding:0em;
  svg{
    width:1.5rem;
  }
  `;

const Left = styled.div`
  display:flex;
  gap: 0rem;
  `;



const MenuNavigation = styled.div`
  display:flex;
  justify-content:space-between;
  margin-bottom: 2em;
  // border:solid 1px black;
  `;


const Styled_Aside = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background-color: white;
  z-index: 1000;
  font-family: Figtree, sans-serif;

  `;

const CategoryContainer = styled.div`
  display:flex;
  flex-direction:column;
  gap: 2em;
  font-size: 1rem;

  `;


const Menu_Nav = styled.nav`
// border: 1px solid black;
margin: 1em 1em;
 `;

const Flex_nutrition = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  font-family: Figtree, sans-serif;
  font-size: 1rem;
  `;

const BackContainer = styled.div`
  display:flex;
  align-items:center;
  font-size: 1rem;
  gap: 0.5em;
  font-family: Figtree, sans-serif;
 
  `;

const Xbutton = styled.div`
 z-index: 1000;
//  position:relative;
  `;


export default function Header() {
  const { cart } = useContext(CartContext);
  const [isMounted, setIsMounted] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [searchClicked, setSearchClicked] = useState(false);
  const [menuExpanded, setMenuExpanded] = useState(false);
  
  useEffect(() => { 
    setIsMounted(true);
  }, []);

  
  function calculateTotal() {
    let total = 0;
    if (cart && cart.length > 0) {
      console.log("cart products:", cart);
      for (const product of cart) {
        if(product.quantity){
        total +=  product.quantity;
      } else{
        console.warn("Product quantity not found in cart", product);
      }
    }
    }
    console.log("cart total", total);
    return total;
  }

  function handleSearchClick(){
    setSearchClicked(!searchClicked)
    setSearchVisible(true);
  }

  function handleSearchClose(){
    setSearchClicked(!searchClicked)
  }

  function CloseSideMenu(){
    setMenuExpanded(false);
  }

  function Menu(){
    const [nutrition, setNutrition] = useState(false);
    const [onSecondPage, setOnSecondPage] = useState(false);
    return (
      <Styled_Aside>
        <Menu_Nav>
          {/* home and cross buttons*/}
          <MenuNavigation>
              {/* home  or goback button*/}
              {onSecondPage ? (
                <StyledButton onClick={ () => setOnSecondPage(false)}>
                  <BackContainer>
                   
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                    </svg>
                    Back
                  </BackContainer>
                 
                </StyledButton>

              ) :(
                <NavLink href={"/"} onClick={CloseSideMenu} >
                  
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
</svg>

              </NavLink>
              ) }
            

              {/* close sidebar */}
              <StyledButton  onClick={CloseSideMenu}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                
              </StyledButton>
          </MenuNavigation>

      
          {onSecondPage ? (
            <CategoryContainer>
                 <NavLink href={"/nutrition/6684ac1855823520ee3925e9"} onClick = {CloseSideMenu}>Best Sellers</NavLink>
              <NavLink href={"/nutrition/6684ac1855823520ee3925e9"} onClick = {CloseSideMenu}>Protein</NavLink>
              <NavLink href={"/nutrition/6684ac1855823520ee3925e9"} onClick = {CloseSideMenu}>Creatine</NavLink>
              <NavLink href={"/nutrition/6684ac1855823520ee3925e9"} onClick = {CloseSideMenu}> Amino Acids </NavLink>
              <NavLink href={"/nutrition/6684ac1855823520ee3925e9"} onClick = {CloseSideMenu}> Vitamins </NavLink>

            </CategoryContainer>
          ) : (
            <CategoryContainer>
            {/* nutrition button */}
            <StyledButton onClick={ () => setOnSecondPage(true)}> 
            
              <Flex_nutrition>
                Nutrition  
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
              </Flex_nutrition>
             
 
            </StyledButton>

            {/*   */}
            <NavLink href={"/nutrition/6684ac1855823520ee3925e9"} onClick = {CloseSideMenu}>Protein</NavLink>
            <NavLink href={"/your-goals"} onClick = {CloseSideMenu} >Your Goal</NavLink>
            <NavLink href={"/expert-advice"} onClick = {CloseSideMenu} > Expert Advice </NavLink>
          </CategoryContainer>
          )}

          
        </Menu_Nav>
      </Styled_Aside>
    )
  }

  return (
    <body>
    
    <StyledHeader>
      <Center>
        <Wrapper>

          {/* left side buttons */}
          <Left>
            <StyledButton
              onClick = {()=> setMenuExpanded(!menuExpanded)}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            </StyledButton>
            {/* search and cross button */}
           
            <SearchButton
              onClick = {()=> handleSearchClick()}
                
            >
              {searchClicked ? (
              <Xbutton>
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
              </Xbutton>
              )
         
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

            <NavLink href={'/cart'}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
              
            ({isMounted ?  calculateTotal() : '...'})</NavLink>
          </StyledNav>
       </Wrapper>  
      </Center>
    </StyledHeader>

    <Overlay visible={menuExpanded || searchClicked} onClick={() => {setMenuExpanded(false); setSearchClicked(false);}} />
     {searchClicked &&  <SearchBar onClose={handleSearchClose} />}
      {menuExpanded && <Menu />}
     </body>
    
  );
}