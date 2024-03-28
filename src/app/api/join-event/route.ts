import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userId = body.userId;
    const eventId = body.eventId;

    //When joining an event:
    // can't join an event that the user already joined
    // subtract 1 to capacity

    const result =
      await sql`SELECT userid,eventid FROM EVENT_PARTICIPATION WHERE
        userId = ${userId} AND eventId = ${eventId}`;

    if (result.rowCount == 0) {
      const addUser =
        await sql`INSERT INTO EVENT_PARTICIPATION (userid,eventid) VALUES (${userId},${eventId})`;

      const subtractCapacity =
        await sql`UPDATE EVENT SET capacity = capacity -1 WHERE eventid = ${eventId}`;

      let returnProperties = {
        message: "User joined event successfully",
        resultInfo: [addUser, subtractCapacity],
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
