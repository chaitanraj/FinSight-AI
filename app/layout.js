"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar/page"
import Footer from "../components/Footer/page"
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import NextAuthSessionProvider from "./SessionProvider";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthSessionProvider>
          <AuthProvider>
            <LayoutContent>{children}</LayoutContent>
            <ToastContainer
              position="top-right"
              autoClose={1000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </AuthProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children }) {
  const pathname = usePathname();
  
  // Hide navbar and footer on these routes
  const hideLayout = pathname === '/Chat' || pathname === '/Chatbot' || pathname.startsWith('/Chat/');
  
  if (hideLayout) {
    return <>{children}</>;
  }
  
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}