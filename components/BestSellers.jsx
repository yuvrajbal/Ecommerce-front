// "use client";
import styled from "styled-components";
import Center from "./Center";
import ProductBox from "./ProductBox";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "../src/app/cart/CartContext";
import CategoryProducts from "./CategoryProducts";


const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr ;
  gap: 0em;
  padding: 1em 2em;

@media (max-width: 768px) {
  grid-template-columns: 1fr 1fr;
}
`;
const QuickBuyButton = styled(Link)`
  background-color: #003942;
  color: white;
  text-transform: uppercase;
  max-width: 8rem;
  padding: 0.5em 1em;
  text-align: center;
  margin-top: 1em;
  cursor: pointer;
  font-size: 1rem;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #003942;
`;

const SectionHeading = styled.h1`
  font-size: 2.2rem;
  font-weight: 600;
  margin: 1.8em 0;
  text-align: center;
  font-family: Apparel;
  font-style: italic;
`;

const ViewAll = styled(Link)` 
  background-color: white;
  color: #003942;
  text-transform: uppercase;
  text-decoration: none;
  padding: 0.5em 1.5em;
  border-radius: 0.2rem;
  cursor: pointer;
  border: 1px solid #003942;
  margin: 2em auto;
  display: flex;
  justify-content: center;
  max-width: 10rem;
`;

export default function BestSellers({ products }) {
  console.log("products",products);


  if (!products || !Array.isArray(products)) {
    return null; // or render a fallback UI
  }
  const sortedProducts = products.sort((a,b) => {
    const rankA = parseInt(a.properties.rank,10);
    const rankB = parseInt(b.properties.rank,10);
    return rankA - rankB;
  })
  const topProducts = sortedProducts.slice(0,5);
  
  // const { addProduct } = useContext(CartContext);

  // go to product page to select flavour and size
  function quickBuyPopup(prodId){
 
    // implement quick buy popup instead of going to the product page

  }
  return (
    
    <CategoryProducts categoryName="Best Sellers" products={topProducts} />
  );
}