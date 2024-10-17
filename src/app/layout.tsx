import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import NavBar from "@/components/navbar";
import Script from "next/script";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Connect to Society App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={`${inter.className} bg-[#111827] mx-auto overflow-x-hidden`}>
          <NavBar />
          <main className="lg:max-w-[1440px] mx-auto">{children}</main>
        </body>
        {/* Use Next.js Script component for the external script */}
      </ClerkProvider>
    </html>
  );
}
