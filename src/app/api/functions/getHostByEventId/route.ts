import { auth, clerkClient } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    //leave it here, this route will get outdated data from DBb without this line of code for some reason
    let url: string = request.url;

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    const result = await sql`
       SELECT userid from EVENT WHERE eventid = ${eventId}
      `;

    // const userId = result.rows[0]?.userid[0];

    const userInfo = await clerkClient.users.getUser(result.rows[0]["userid"]);

    if (!userInfo) {
      return NextResponse.json({ error: "Host not found" }, { status: 404 });
    }

    return NextResponse.json({ userInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
