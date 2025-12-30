import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 7 Intimacies™ - 30-Day Couples Connection Planner",
  description: "A therapist-designed month of intentional love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
