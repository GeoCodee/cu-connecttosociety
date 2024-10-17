import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
<<<<<<< HEAD
import fs from "node:fs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const { userId } = auth();
  const createdEventStr = formData.get("createdEvent");
  const createdEvent = createdEventStr
    ? JSON.parse(createdEventStr as string)
    : null;

  const file = formData.get("file");

  const {
    eventTags,
    eventLocation,
    eventName,
    description,
    eventDate,
    eventTime,
    capacity,
  } = createdEvent;

  try {
    const eventResult = await sql`
    INSERT INTO event (
      userid, description, eventname, eventlocation, eventtime, eventdate, capacity, eventTags
    ) VALUES (
      ${userId}, ${description}, ${eventName}, ${eventLocation}, ${eventTime}, ${eventDate}, ${capacity}, ${eventTags}::text[]
    )
    RETURNING eventid;
  `;

    const insertedEventId: number = eventResult.rows[0].eventid;

    console.log(eventResult.rows[0].eventid);
    const extension = file.name.split(".").pop();
    const fileName = `${Math.random()}.${extension}`;
    const stream = fs.createWriteStream(`public/userImages/${fileName}`);
    const bufferedImage = await file.arrayBuffer();
    stream.write(Buffer.from(bufferedImage));
    stream.end();
    const filePath = `userImages/${fileName}`;
    console.log(filePath);

    await sql`
      INSERT INTO image (
        imageurl, eventid
      ) VALUES (
        ${filePath}, ${insertedEventId}
      );
    `;

    const events = await sql`SELECT * FROM event`;
    return NextResponse.json({ events }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
=======

export async function POST(req: Request) {
  const body = await req.json();

  const { userId } = auth();

  const description = body.description;
  const eventName = body.eventName;
  const eventLocation = body.location;
  const eventTime = body.time;
  const capacity = body.capacity;
  const eventDate = body.date;
  const eventTags = body.eventTags;

  //   const eventType = body.eventType;
  //   const email;

  try {
    await sql`INSERT INTO Event(userid,description,eventname,eventlocation,eventtime,eventDate,capacity, event_tags) VALUES(${userId},${description},${eventName},${eventLocation},${eventTime},${eventDate},${capacity},${eventTags})`;
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error }, { status: 500 });
  }

  const events = await sql`SELECT * FROM Event`;
  return NextResponse.json({ events }, { status: 200 });
>>>>>>> 12550ce2b30c2da9931bc53a9b52e37067641583
}
