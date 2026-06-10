import { Inter, Inder } from "next/font/google";
import "./globals.css";

// 1. Define your Google fonts safely
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const inder = Inder({ subsets: ["latin"], weight: "400", variable: "--font-inder" });

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${inder.variable} h-full`} // Cleaned up old Geist variables
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}