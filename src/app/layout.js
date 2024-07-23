"use client";
import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Header from "../../components/Header";
import { CartContextProvider } from "../../components/CartContext";
import { useContext } from "react";
import { CartContext } from "../../components/CartContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "TNC",
//   description: "Ecommerce front",
// };
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  const { cart } = useContext(CartContext);
  return (
    <html lang="en">
      <head></head>
      <body className={roboto.className}>
        <CartContextProvider>
          <Header />
          {children}
        </CartContextProvider>
      </body>
    </html>
  );
}
