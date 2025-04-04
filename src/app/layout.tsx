import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taskify | Smart Task Manager",
  description: "A modern task management application with neon accents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
