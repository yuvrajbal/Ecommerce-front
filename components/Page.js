"use client";
import { createGlobalStyle } from "styled-components";
import Header from "./Header";
import CategoryLinks from "./CategoryLinks";
import BestSellers from "./BestSellers";
import PickYourProtein from "./PickYourProtein";
import Footer from "./Footer";
import styled from "styled-components";
// import { getCategoryId } from "./GetCategory";
// import { CartContextProvider } from "./CartContext";
const GlobalStyles = createGlobalStyle`
  body {
    padding:0;
    margin:0;
`;

const Top_Padding = styled.div`
  // padding-top: 4.5rem;
`;

export default function Page({ products }) {
  // console.log(product);
  // const proteinId = getCategoryId("Protein");
  return (
    <>
      <GlobalStyles />

      <CategoryLinks />
      <BestSellers products={products} />
      <PickYourProtein />
      <Footer />
    </>
  );
}
