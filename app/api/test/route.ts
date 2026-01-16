import { db } from "@/db";
import { users } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const data = await db.select().from(users);

    console.log("USER Data: ", data);
    return NextResponse.json(data);
  } catch (error) {
    console.log("INTERNAL ERROR");
  }
}
