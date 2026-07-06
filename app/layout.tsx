import type { Metadata } from "next";
import { Suspense } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { ThemeProvider } from "@/components/ui/theme-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/components/ui/sonner";
import { Spinner } from "@/components/ui/spinner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coremind Vendor",
  description: "Vendor management platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="mn" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[--bg-secondary] text-[--text-primary]">
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        > */}
        <NuqsAdapter>
          <TooltipProvider>
            <Suspense
              fallback={
                <div className="w-full items-center justify-center h-[40vh] flex">
                  <Spinner />
                </div>
              }
            >
              {children}
            </Suspense>
            <Toaster />
          </TooltipProvider>
        </NuqsAdapter>
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
