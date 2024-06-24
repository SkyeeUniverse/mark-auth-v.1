"use client";

import Input from "@/components/Input";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RegisterForm() {
  useEffect(() => {
    signOut({
      redirect: false,
    });
  });

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const register = async () => {
    if (EMAIL_REGEX.test(email)) {
      try {
        setLoading(true);
        await axios.post("/api/register", {
          username,
          email: email,
          password,
        });

        toast.success("Registrasi Berhasil");
        router.push("/signin");
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data);
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Email tidak valid");
    }
  };

  return (
    <div className="space-y-5 flex flex-col items-center">
      <Input
        label="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        disabled={loading}
      />
      <Input
        label="email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />
      <Input
        label="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        type="password"
      />
      <button
        onClick={register}
        className="px-10 py-3 bg-neutral-900 rounded-full text-white disabled:opacity-70"
      >
        Register
      </button>
    </div>
  );
}
