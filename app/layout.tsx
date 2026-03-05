import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AltAccess | Invest in Top Performing PMS & AIFs",
  description:
    "AltAccess is India's first AI + Human Wealth Advisor for HNIs. Discover curated PMS & AIF investment solutions that consistently beat benchmarks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className} ${manrope.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
