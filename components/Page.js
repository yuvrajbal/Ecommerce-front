"use client";
import { createGlobalStyle } from "styled-components";
import Header from "./Header";
import CategoryLinks from "./CategoryLinks";
import BestSellers from "./BestSellers";
import PickYourProtein from "./PickYourProtein";
import Footer from "./Footer";
// import { getCategoryId } from "./GetCategory";
// import { CartContextProvider } from "./CartContext";
const GlobalStyles = createGlobalStyle`
  body {
    padding:0px;
    margin:0;
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
