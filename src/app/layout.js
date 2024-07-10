import { Inter } from "next/font/google";
import { Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TNC",
  description: "Ecommerce front",
};
const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head></head>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
