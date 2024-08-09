import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Header from "../../components/Header";
import { CartContextProvider } from "./cart/CartContext";
import { useContext } from "react";
import { CartContext } from "./cart/CartContext";
import { ClerkProvider } from "@clerk/nextjs";
import TopPadding from "../../components/TopPadding";
import "./globals.css";
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={roboto.className}>
        <ClerkProvider>
          <CartContextProvider>
            <Header />
            <TopPadding />
            {children}
          </CartContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
