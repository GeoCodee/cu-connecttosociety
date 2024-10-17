import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
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
}
