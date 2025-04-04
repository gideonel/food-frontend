import { Geist, Geist_Mono } from "next/font/google";
import Link from 'next/link';
import "./globals.css";
import Header from './components/Header';
import Footer from './components/Footer';
import Chat from "./components/Chat";


export const metadata = {
  title: "Food Inquiry",
  description: "Generated by create next app",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Header />
        </nav>
        {children}
        <Chat />
        <Footer />
      </body>
    </html>
  );
}
