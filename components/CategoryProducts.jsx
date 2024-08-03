"use client";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";
import Link from "next/link";



const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr ;
  gap: 0em;
  // padding: 1em 2em;

@media (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
`;
const QuickBuyButton = styled(Link)`
  background-color: #003942;
  color: white;
  text-transform: uppercase;
  max-width: 8rem;
  width: 100%;
  padding: 0.5em 1em;
  text-align: center;
  margin-top: 2em;
  
  
  cursor: pointer;
  font-size: 1rem;
  text-decoration: none;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // border: 3px solid yellow;
  margin-bottom: 3em;
  
  
`;

const SectionHeading = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 1.8em 0;
  text-align: center;
  font-family: Apparel;
  font-style: italic;
`;


export default function CategoryProducts({categoryName, products }) {
  console.log("products in this category",products);


  if (!products || !Array.isArray(products)) {
    return null; // or render a fallback UI
  }

  // go to product page to select flavour and size
  function quickBuyPopup(prodId){
 
    // implement quick buy popup instead of going to the product page

  }
  return (
    <Center>
      
      <SectionHeading>{categoryName}</SectionHeading>
      
      <ProductsGrid>

        {products.map((product) => (
          <ProductContainer key={product._id}>
            <ProductBox {...product} />
            <QuickBuyButton href ={`/product/${product._id}`} onClick={() => quickBuyPopup(product._id)}>Quick Buy</QuickBuyButton> 
          </ProductContainer>
        ))}
      
      </ProductsGrid>
      
     
    
    </Center>
  );
}