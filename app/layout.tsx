import type { Metadata } from "next";
import type { ReactNode } from "react";
import TabBar from "@/components/TabBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Explorer",
  description: "Interactive pastel world map with AI-powered country chat",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <TabBar />
      </body>
    </html>
  );
}
