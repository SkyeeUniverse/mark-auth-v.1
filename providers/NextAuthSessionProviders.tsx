"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";

interface NextAuthSessionProviders {
  children: React.ReactNode;
}

export default function NextAuthSessionProviders({
  children,
}: NextAuthSessionProviders) {
  return <SessionProvider>{children}</SessionProvider>;
}
