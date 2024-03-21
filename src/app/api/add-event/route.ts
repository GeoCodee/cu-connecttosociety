import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const body = await req.json();

  const { userId } = auth();
  const description = body.description;
  const eventName = body.eventName;
  const eventLocation = body.location;
  const eventTime = body.time;
  const capacity = body.capacity;
  const eventDate = body.date;

  //   const eventType = body.eventType;
  //   const email;

  try {
    await sql`INSERT INTO Event(userid,description,eventname,eventlocation,eventtime,eventDate,capacity) VALUES(${userId},${description},${eventName},${eventLocation},${eventTime},${eventDate},${capacity})`;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error }, { status: 500 });
  }

  const events = await sql`SELECT * FROM Event`;
  return NextResponse.json({ events }, { status: 200 });
}
