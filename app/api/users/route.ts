import {
  checkValidEmail,
  encryptPassword,
  usernameGenerator,
} from "@/lib/generator";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface InputData {
  name?: string;
  email?: string;
  password?: string;
}
// New User
export async function POST(req: NextRequest) {
  const { email, name, password }: InputData = await req.json();

  if (!name?.trim() || !email?.trim() || !password?.trim()) {
    return NextResponse.json({ message: "Invalid input data !" });
  }
  try {
    if (password.length < 4) {
      return NextResponse.json({ message: "Password is sort !" });
    }
    if (!checkValidEmail(email)) {
      return NextResponse.json({ message: "Invalid email address !" });
    }

    // Find Existing user
    const findExitUser = await prisma.user.findUnique({ where: { email } });
    if (findExitUser) {
      return NextResponse.json({ message: "User already exists !" });
    }

    const encodePass = await encryptPassword(password?.trim());
    // Generate Unique Username
    const username = usernameGenerator(name);

    await prisma.user.create({
      data: {
        name: name?.trim(),
        email: email?.toLowerCase().trim(),
        username,
        password: encodePass,
      },
    });
    return NextResponse.json({
      message: "User created successfully !",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const users = await prisma.user.findMany({
      where: {
        NOT: { id: userId as string },
      },
      take: 20,
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
