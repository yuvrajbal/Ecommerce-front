"use client";
import { createGlobalStyle } from "styled-components";
import Header from "./Header";
import Featured from "./Featured";
import BestSellers from "./BestSellers";
import PickYourProtein from "./PickYourProtein";
import Footer from "./Footer";
const GlobalStyles = createGlobalStyle`
  body {
    padding:0px;
    margin:0;
`;

export default function Page({ products }) {
  // console.log(product);
  return (
    <>
      <GlobalStyles/>
      <Header />
      <Featured />
      <BestSellers products ={products} />
      <PickYourProtein/>
      <Footer />
    </>
  );
}