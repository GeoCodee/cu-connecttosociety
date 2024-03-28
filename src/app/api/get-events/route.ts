import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    //leave it here, this route will get outdated data from DBb without this line of code for some reason
    let url: string = request.url;
    // await sql`DROP TABLE IF EXISTS EVENT`;

    // const result = await sql`
    //           SELECT * FROM EVENT;
    //         `;

    const result = await sql`
        SELECT * FROM event e
        LEFT JOIN event_participation ep ON e.eventId = ep.eventId AND ep.userId = 'your_user_id'
        WHERE ep.eventId IS NULL
        AND e.capacity > 0;
      `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
