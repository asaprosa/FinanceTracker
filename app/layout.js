import localFont from "next/font/local";
import { Anton } from "next/font/google";
import "./globals.css";  // Ensure this file exists and is properly loaded
import { Toaster } from "@/components/ui/sonner";  // Double-check the relative path

// Importing local fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff", // Ensure the path is correct
  variable: "--font-geist-sans",
  weight: "100 900", // Ensure this range is supported by the font
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // Ensure the path is correct
  variable: "--font-geist-mono",
  weight: "100 900", // Ensure this range is supported by the font
});

// Importing Anton font from Google
const anton = Anton({
  weight: "400", // Anton only supports one weight
  subsets: ["latin"],
  variable: "--font-anton",
});

// Metadata for SEO
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
