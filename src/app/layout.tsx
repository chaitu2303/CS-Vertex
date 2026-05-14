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
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="bg-white text-slate-900 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
