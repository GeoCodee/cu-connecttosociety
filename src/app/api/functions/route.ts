import { clerkClient } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function getHostByEventId(eventId: any) {
  const eventHost =
    await sql`SELECT userid FROM EVENT where eventid=${eventId}`;

  try {
    const user = await clerkClient.users.getUser(eventHost.rows[0]["userid"]);

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    throw new Error("Failed to fetch user details");
  }
}
