import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  // Optionally set other pool options
  // max: 20, // maximum number of clients in the pool
  // idleTimeoutMillis: 30000, // close clients after 30 seconds of inactivity
  // connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be established
});

export async function GET(request: Request) {
  try {
    const searchParams = new URL(request.url).searchParams;
    const filter = searchParams.get("filter");

    if (!filter) {
      return NextResponse.json(
        { error: "No filter provided" },
        { status: 400 }
      );
    }

    const pgArray = `{${filter.split(",").join(",")}}`;

    console.log(`
      SELECT * FROM EVENT WHERE eventTags && ARRAY[${pgArray}];
    `);

    const result = await pool.query(
      `SELECT * FROM EVENT WHERE eventTags && $1::text[]`,
      [pgArray]
    );


    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
