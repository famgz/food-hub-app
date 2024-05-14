import { Toaster } from "@/app/_components/ui/sonner";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { CartProvider } from "./_context/cart";
import AuthProvider from "./_providers/auth";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={poppins.className}>
        <div className="mx-auto max-w-[678px]">
          <AuthProvider>
            <CartProvider>{children}</CartProvider>
            <Toaster />
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
