import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { TopNav } from "@/components/custom/top-nav";
import { Providers } from "@/components/custom/providers";
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Link To - BLT Labs",
  description: "A simple URL shortener built with Next.js, Prisma, and PostgreSQL. Create short links and track clicks for your long URLs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full">
        <Toaster />
        <Providers>
          <header>
            <div className="right-0 top-0 w-full absolute">
              <TopNav />
            </div>
          </header>

          {children}
        </Providers>

      </body>
    </html>
  );
}
