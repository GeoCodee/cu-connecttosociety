import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = auth();

  try {
    //leave it here, this route will get outdated data from DBb without this line of code for some reason
    let url: string = request.url;
    // await sql`DROP TABLE IF EXISTS EVENT`;

    // const result = await sql`
    //           SELECT * FROM EVENT;
    //         `;

    // console.log(userId);

    //only select events that have capaciy > 0
    //only select events that doesn't have userId and eventId in event_particiption
    const result = await sql`
        SELECT e.*
        FROM EVENT e
        LEFT JOIN EVENT_PARTICIPATION ep 
            ON e.eventId = ep.eventid 
            AND ep.userid = ${userId}
        WHERE e.capacity > 0 
            AND ep.participationid IS NULL;
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
