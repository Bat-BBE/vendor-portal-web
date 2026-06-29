import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coremind Vendor",
  description: "Vendor management platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-[--bg-secondary] text-[--text-primary]">
        {children}
      </body>
    </html>
  );
}
