"use client";
import { SessionProvider as Session } from "next-auth/react";
import React from "react";
import { Toaster } from "react-hot-toast";

function SessionProvider({ children }: { children: React.ReactNode }) {
  return (
    <Session>
      <Toaster />
      <>{children}</>
    </Session>
  );
}

export default SessionProvider;
