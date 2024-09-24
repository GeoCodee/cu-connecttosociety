import { auth, clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { userId } = auth();

  try {
    let url: string = request.url;
    // const { searchParams } = new URL(request.url);
    // const userId = searchParams.get("userId");

    if (userId) {
      const userInfo = await clerkClient.users.getUser(userId);

      if (!userInfo) {
        return NextResponse.json({ error: "User not found" });
      }
      return NextResponse.json({ userInfo }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
