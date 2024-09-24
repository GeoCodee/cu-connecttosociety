import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = auth();

  try {
    const { searchParams } = new URL(request.url);
    const userIdParam = searchParams.get("userId");

    // Use userIdParam if provided, otherwise fallback to authenticated user's ID
    const userIdValue = userIdParam || userId;

    if (!userIdValue) {
      throw new Error(`User ID is required but not provided: ${userId}`);
    }

    const result = await sql`
      SELECT * FROM profile WHERE id = ${userIdValue}
    `;

    // if (result.rowCount === 0) {
    //   throw new Error("User not found.");
    // }
    // console.log(`${result.rows[0].id}`);

    return NextResponse.json({ result: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
