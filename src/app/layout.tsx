import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookIQ - Know Your Numbers, Know Your Business",
  description: "Virtual CFO clarity for real business owners who demand accurate financials and strategic insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              document.querySelectorAll('a[href^="#"]').forEach(function(link) {
                link.addEventListener('click', function(e) {
                  e.preventDefault();
                  var target = this.getAttribute('href');
                  if (target === '#' || !document.querySelector(target)) {
                    return;
                  }
                  document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
                });
              });
            });
          `
        }} />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
        style={{ backgroundColor: "#030712", color: "#f1f5f9" }}
      >
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
