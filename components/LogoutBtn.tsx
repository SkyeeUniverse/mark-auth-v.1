"use client";

import { signOut } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

export default function LogoutBtn() {
  return (
    <button
      className="text-center px-4 py-2 rounded-full text-white bg-neutral-900 shadow-md"
      onClick={() => {
        signOut();
      }}
    >
      Logout
    </button>
  );
}
