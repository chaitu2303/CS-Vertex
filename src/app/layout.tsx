import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CS Vertex | Build Beyond Limits — AI Business Automation & Software Platforms",
  description: "CS Vertex is a futuristic full-stack software and automation platform. We provide premium web ecosystems, digital billing systems, AI chatbot consultation agents, WhatsApp business tunnels, and verified internship portals.",
  keywords: ["CS Vertex", "SaaS Automation", "AI Billing", "Smart Invoicing Software", "Telugu Voice Assistant", "WhatsApp Automation", "Student Internships", "Web Development Portal"],
  authors: [{ name: "CS Vertex Engineering Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <body className="bg-white text-slate-900 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
