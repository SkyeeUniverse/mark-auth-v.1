import LogoutBtn from "@/components/LogoutBtn";
import { authOptions } from "@/libs/AuthOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <div className="h-screen w-full flex items-center justify-center bg-gray-100">
        <div className="p-10 bg-white rounded-md shadow-lg w-full sm:w-3/4 lg:w-auto">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-neutral-900">WELCOME</h1>
            <hr className="my-5" />
            <h1 className="text-2xl mb-6 text-neutral-900">
              {session?.user?.email}
            </h1>
            <LogoutBtn />
          </div>
        </div>
      </div>
    </main>
  );
}
