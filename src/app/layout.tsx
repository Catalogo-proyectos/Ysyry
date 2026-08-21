import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ysyry",
  description: "Proyecto Ysyry con Next.js, Tailwind CSS y Zustand",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased min-h-screen bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
