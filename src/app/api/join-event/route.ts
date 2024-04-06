import { MailProperties, sendConfirmationEmail } from "@/lib/mail";
import { auth, currentUser } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import axios from "axios";
// import { getUserEmailById } from "@/lib/clerkFunction";
import { stringify } from "querystring";
import { getUserEmailById } from "@/lib/clerkFunction";

export async function POST(req: Request) {
  const { userId } = auth();
  const user = await currentUser();

  const body = await req.json();

  const eventId = body.eventId;

  const joinerEmail = user?.emailAddresses[0].emailAddress;
  //When joining an event:
  // can't join an event that the user already joined
  // subtract 1 to capacity

  // console.log(body);
  // console.log(userId);
  // console.log(eventId);
  const eventDetails =
    await sql`SELECT * FROM EVENT WHERE eventid = ${eventId}`;

  const getUserById = getUserEmailById(user?.id);
  console.log("User Properties: \n");
  console.log("Name:", getUserById);
  
  const mailProperties: MailProperties = {
    to: joinerEmail,
    eventName: eventDetails.rows[0]["eventname"],
    organizerName: "Geoffrey Fornoles", //Need to get data
    eventDescription: eventDetails.rows[0]["description"],
    eventLocation: eventDetails.rows[0]["eventlocation"],
    subject: "Confirmation Email",
    // body: "<h1>This is a test</h1>",
  };

  const result = await sql`SELECT userid,eventid FROM EVENT_PARTICIPATION WHERE
    userId = ${userId} AND eventId = ${eventId}`;
  try {
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
