"use client"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} flex flex-col min-h-screen bg-gradient-to-b from-blue-100 to-white`}>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </QueryClientProvider>
      </body>
    </html>
  );
}