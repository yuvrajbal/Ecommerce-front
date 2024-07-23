"use client";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "../../../components/CartContext";
const GlobalStyles = createGlobalStyle`
  body {
    padding:0px;
    margin:0;
`;

export default function CartLayout({ children }) {
  return (
    <>
      <GlobalStyles />
      <CartContextProvider>{children}</CartContextProvider>
    </>
  );
}
