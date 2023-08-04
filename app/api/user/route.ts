import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const userId = req.nextUrl.searchParams.get("userId");
    const users = await prisma.user.findFirst({
      where: {
        id: userId as string,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
