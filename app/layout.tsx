import type { Metadata } from "next";
import { Monoton } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import SessionProviderWrapper from "@/(components)/SessionProviderWrapper";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${monoton.variable} antialiased`}>
        <SessionProviderWrapper>
          {" "}
          {/* ✅ Wrap children in SessionProvider */}
          {children}
        </SessionProviderWrapper>

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
