import type { Metadata } from "next";
import { Monoton } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

const monoton = Monoton({
  variable: "--font-monoton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Tasque App",
  description:
    "Tasques app is a task management application that helps you organize your tasks efficiently.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${monoton.variable} antialiased`}
        style={{ fontFamily: "var(--font-monoton), sans-serif" }}
      >
        {children}
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            className: "bg-gray-800 text-white",
            style: {
              fontSize: "16px",
              padding: "10px 20px",
            },
          }}
        />
      </body>
    </html>
  );
}
