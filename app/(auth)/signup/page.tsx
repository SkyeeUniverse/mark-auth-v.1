import React from "react";
import RegisterForm from "./components/RegisterForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/AuthOptions";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100">
      <div className="p-10 bg-white rounded-md shadow-lg w-full sm:w-3/4 lg:w-auto">
        <h1 className="text-4xl font-semibold text-center text-neutral-900">
          Register Page
        </h1>
        <hr className="my-5" />
        <RegisterForm />
        <div className="text-sm text-center text-neutral-500 mt-5">
          Sudah punya akun?{" "}
          <Link className="font-bold text-neutral-900" href={"/signin"}>
            Login disini
          </Link>
        </div>
      </div>
    </div>
  );
}
