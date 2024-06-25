import { Inter } from "next/font/google";
import Sidebar from "@/app/components/Sidebar.jsx";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hurun India",
  description: "Generated by njan_sony",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png"></link>
      </head>
      <body>
        {children}
        {/* <footer className="items-center justify-center">Created by <Link className="text-gray-300" href="https://www.linkedin.com/in/njansony">Sony Thomas</Link></footer> */}
      </body>
      
    </html>
  );
}
