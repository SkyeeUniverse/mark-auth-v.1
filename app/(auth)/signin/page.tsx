import React from "react";
import LoginForm from "./components/LoginForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="p-10 bg-white rounded-md shadow-lg w-full sm:w-3/4 lg:w-auto">
        <h1 className="text-4xl font-semibold text-center text-neutral-900">
          Login Page
        </h1>
        <hr className="my-5" />
        <LoginForm />
        <div className="text-sm text-center text-neutral-500 mt-5">
          Tidak punya akun{" "}
          <Link className="font-bold text-neutral-900" href={"/signup"}>
            Registrasi disini
          </Link>
        </div>
      </div>
    </div>
  );
}
