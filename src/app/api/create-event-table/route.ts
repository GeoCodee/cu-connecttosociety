import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    await sql`DROP TABLE IF EXISTS EVENT`;

    const result = await sql`
                CREATE TABLE EVENT(
                eventId SERIAL PRIMARY KEY,
                userId INT,
                eventName VARCHAR(255),
                eventLocation VARCHAR(255),
                eventTime VARCHAR(255),
                capacity INT,
                eventType VARCHAR(255)
            );
            `;

    //NOTE:
    //Make userId a foreign key to User table

    //     - Step 2: Add foreign key constraint later
    // ALTER TABLE Event
    // ADD CONSTRAINT fk_userId
    // FOREIGN KEY (userId) REFERENCES User(userId);

    //NOTE:
    //eventType will be collections of tags
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
