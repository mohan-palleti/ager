import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ager | Calculate Your Remaining Days",
  description: "Calculate your remaining days to live based on your age or date of birth. Get insights about your life journey with positive quotes and visual progress tracking.",
  keywords: "Ager, age calculator, remaining days, life expectancy, life progress",
  openGraph: {
    title: "Ager | Calculate Your Remaining Days",
    description: "Calculate your remaining days to live based on your age or date of birth. Get insights about your life journey with positive quotes and visual progress tracking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
