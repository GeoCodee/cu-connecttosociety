import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = body.userId;
    const eventId = body.eventId;

    const result =
      await sql`SELECT userid,eventid FROM EVENT_PARTICIPATION WHERE
        userId = ${userId} AND eventid = ${eventId}`;

    if (result.rowCount == 0) {
      let returnProperties = {
        message: "User joined event successfully",
        resultInfo: result,
      };
      return NextResponse.json({ returnProperties }, { status: 200 });
    } else {
      let returnProperties = {
        message: "User is already part of the event",
        resultInfo: result,
      };
      return NextResponse.json({ returnProperties }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
