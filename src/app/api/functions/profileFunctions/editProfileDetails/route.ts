import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { auth } from "@clerk/nextjs";

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    console.log("Received body:", body);

    const { name, description, interestTags } = body;

    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" },
        { status: 400 }
      );
    }

    if (
      !interestTags ||
      !Array.isArray(interestTags) ||
      interestTags.length === 0
    ) {
      console.log("interestTags is undefined, not an array, or empty");
      return NextResponse.json(
        { error: "Interest tags are required and must be a non-empty array" },
        { status: 400 }
      );
    }

    console.log("interestTags:", interestTags);

    // Check if the profile exists
    const existingProfile = await sql`
      SELECT * FROM profile WHERE id = ${userId}
    `;

    let result;
    if (existingProfile.rowCount > 0) {
      // Update existing profile
      result = await sql`
        UPDATE profile
        SET name = ${name},
            description = ${description},
            interest_tags = ${interestTags}::text[]
        WHERE id = ${userId}
      `;
    } else {
      // Insert new profile
      result = await sql`
        INSERT INTO profile (id, name, description, interest_tags)
        VALUES (${userId}, ${name}, ${description}, ${interestTags}::text[])
      `;
    }

    console.log("Query result:", result);

    return NextResponse.json(
      { message: "Profile updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile", details: error.message },
      { status: 500 }
    );
  }
}
