import { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/libs/prismadb";
import bcrypt, { compare } from "bcrypt";
import { login } from "./services";

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Credentials tidak ditemukan");
        }
        const user = await prismadb.user.findFirst({
          where: {
            email: credentials.email,
          },
        });
        if (!user || !user.id || !user.hashedPassword) {
          throw new Error("User tidak teregistrasi");
        }

        if (user) {
          const isCorrectPassword = await compare(
            credentials.password,
            user.hashedPassword
          );
          if (!isCorrectPassword) {
            throw new Error("Password salah");
          }
        }

        return user;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
