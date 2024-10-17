import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = auth();

  try {
    //leave it here, this route will get outdated data from DBb without this line of code for some reason
    let url: string = request.url;

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventid");

    const result = await sql`
       SELECT userid from EVENT WHERE eventid = ${eventId}
      `;

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
