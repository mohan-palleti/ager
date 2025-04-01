import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/ThemeToggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ager - Life Calculator",
  description: "Calculate your life journey and remaining time",
  keywords: "Ager, age calculator, remaining days, life expectancy, life progress",
  openGraph: {
    title: "Ager | Calculate Your Remaining Days",
    description: "Calculate your remaining days to live based on your age or date of birth. Get insights about your life journey with positive quotes and visual progress tracking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-200`}>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
          <ThemeToggle />
          {children}
        </div>
      </body>
    </html>
  );
}
