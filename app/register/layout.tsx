"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

function SessionProviderWrapper({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

// Example usage of SessionProviderWrapper in your layout
export default function Layout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProviderWrapper session={session}>
      {children}
    </SessionProviderWrapper>
  );
}
