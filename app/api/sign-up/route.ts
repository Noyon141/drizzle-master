import { db } from "@/db";
import { users } from "@/db/schema";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type credentialProps = {
  name?: string;
  email: string;
  password: string;
  role?: "user" | "admin" | "moderator";
  isActive?: boolean;
};
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { name, email, password, role, isActive }: credentialProps = body;

    if (!email || !password) {
      return new NextResponse("Email or Password is required");
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existingUser) {
      return NextResponse.json("USER ALREADY EXISTS");
    }

    const user = await db
      .insert(users)
      .values({
        id: randomUUID(),
        name,
        email,
        password,
        role,
      })
      .returning();

    return NextResponse.json({
      message: "USER CREATED SUCCESSFULLY",
      user: user[0],
    });
  } catch (error) {
    console.log("INTERNAL ERROR WHILE SIGNING UP ACCOUNT", error);
    return NextResponse.json("INTERNAL ERROR WHILE SIGNING UP ACCOUNT", {
      status: 500,
    });
  }
}
