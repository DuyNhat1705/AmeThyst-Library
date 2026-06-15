import { Inter, Manrope, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const openSans = Open_Sans({ subsets: ["latin"], variable: "--font-open-sans" });

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${openSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-inter antialiased">
        <main className="flex-grow">{children}</main>
      </body>
    </html>
  );
}