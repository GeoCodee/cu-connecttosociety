import { MailProperties, sendConfirmationEmail } from "@/lib/mail";
import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId } = auth();
  try {
    const body = await req.json();

    const eventId = body.eventId;

    //When joining an event:
    // can't join an event that the user already joined
    // subtract 1 to capacity

    // console.log(body);
    // console.log(userId);
    // console.log(eventId);
    const mailProperties: MailProperties = {
      to: "geofornoles897@gmail.com",
      eventName: "CU first Mail",
      organizerName: "Geo",
      eventDescription: "Celebrate first email",
      eventLocation: "Virtual",
      subject: "Test CU",
      // body: "<h1>This is a test</h1>",
    };

    const result =
      await sql`SELECT userid,eventid FROM EVENT_PARTICIPATION WHERE
    userId = ${userId} AND eventId = ${eventId}`;

    if (result.rowCount == 0) {
      const addUser =
        await sql`INSERT INTO EVENT_PARTICIPATION (userid,eventid) VALUES (${userId},${eventId})`;

      const subtractCapacity =
        await sql`UPDATE EVENT SET capacity = capacity - 1 WHERE eventid = ${eventId}`;

      let returnProperties = {
        message: "User joined event successfully",
        resultInfo: [addUser, subtractCapacity],
        isSuccessful: 1,
      };

      sendConfirmationEmail(mailProperties);

      return NextResponse.json({ returnProperties }, { status: 200 });
    } else {
      let returnProperties = {
        message: "User is already part of the event",
        resultInfo: result,
        isSucessFul: 0,
      };
      return NextResponse.json({ returnProperties }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
