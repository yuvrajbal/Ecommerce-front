import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";
import Header from "../../components/Header";
import { CartContextProvider } from "./cart/CartContext";
import { useContext } from "react";
import { CartContext } from "./cart/CartContext";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "TNC",
//   description: "Ecommerce front",
// };
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  // const { cart } = useContext(CartContext);
  return (
    <html lang="en">
      <head></head>
      <body className={roboto.className}>
        <ClerkProvider>
          <CartContextProvider>
            <Header />
            {children}
          </CartContextProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
