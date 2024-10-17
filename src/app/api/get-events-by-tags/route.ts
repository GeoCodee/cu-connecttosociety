import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    // Get the query parameters from the URL
    const { searchParams } = new URL(request.url);
    const tag = searchParams.get("tag");
    console.log(tag);
    // if (!tag) {
    //   return NextResponse.json({ error: "Tag is required" }, { status: 400 });
    // }

    const result = await sql`
    SELECT * FROM EVENT WHERE ${tag} = ANY(event_tags)
  `;
  

    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
