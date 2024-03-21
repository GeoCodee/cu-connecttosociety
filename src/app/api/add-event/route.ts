import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  const body = await req.json();

  const { userId } = auth();
  const eventName = body.eventName;
  const eventLocation = body.eventLocation;
  const eventTime = body.eventTime;
  const capacity = body.capacity;
  //   const eventType = body.eventType;
  //   const email;

  try {
    await sql`INSERT INTO Event(userid,eventname,eventlocation,eventtime,capacity) VALUES(${userId},${eventName},${eventLocation},${eventTime},${capacity})`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  const events = await sql`SELECT * FROM Event`;
  return NextResponse.json({ events }, { status: 200 });
}
