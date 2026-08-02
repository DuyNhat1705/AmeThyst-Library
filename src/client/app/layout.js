import { Inter, Manrope, Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { I18nProvider } from "./providers/I18nProvider";
import PublicPageAdminGuard from "./components/atoms/PublicPageAdminGuard";

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
        <I18nProvider>
          <ThemeProvider>
            <PublicPageAdminGuard>
              <main className="flex-grow">{children}</main>
            </PublicPageAdminGuard>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  );
}