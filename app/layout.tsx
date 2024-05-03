import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./_context/cart";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Food Hub App",
  description:
    "Food delivery app that connects consumers with local restaurants",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mx-auto max-w-[678px]">
          <CartProvider>{children}</CartProvider>
        </div>
      </body>
    </html>
  );
}
