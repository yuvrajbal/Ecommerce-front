"use client";
import { createGlobalStyle } from "styled-components";
const GlobalStyles = createGlobalStyle`
  body {
    padding:0px;
    margin:0;
`;

export default function CategoryLayout({ children }) {
  return (
    <>
      <GlobalStyles />
      {children}
    </>
  );
}
