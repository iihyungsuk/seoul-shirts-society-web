import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ReactPlugin } from "@stagewise-plugins/react";
import { StagewiseToolbar } from "@stagewise/toolbar-next";

import { AppProvider } from "@/app/providers";

import { pretendard } from "./fonts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Seoul Shirts Society",
  description: "Minimalist, modern t-shirts for everyday wear.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} ${pretendard.variable}`}
    >
      <body className="font-pretendard min-h-screen bg-white text-neutral-900 antialiased">
        <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
