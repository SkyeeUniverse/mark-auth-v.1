import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, password } = body;

    if (!email || !username || !password) {
      return new NextResponse("Data belum diisi", { status: 500 });
    }

    const userAlreadyExist = await prismadb.user.findFirst({
      where: {
        email: email,
      },
    });

    if (userAlreadyExist?.id) {
      return new NextResponse("Users telah teregistrasi", { status: 500 });
    }

    const hashedPassword = await bcrypt.hash(password, 6);

    const newUser = await prismadb.user.create({
      data: {
        email: email,
        username: username,
        hashedPassword: hashedPassword,
      },
    });

    return NextResponse.json(newUser);
  } catch (error: any) {
    console.log("Registrasi Error" + error);
    return new NextResponse(error, { status: 500 });
  }
}
