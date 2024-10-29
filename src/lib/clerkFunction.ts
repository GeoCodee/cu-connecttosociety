import { clerkClient } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import axios from "axios";
import { NextResponse } from "next/server";

const { CLERK_SECRET_KEY } = process.env;

export async function getUserEmailById(userId: any) {
  const apiUrl = `https://api.clerk.io/v1/users/${userId}`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      mode: "cors",
    },
  };

  try {
    // const response = await fetch(apiUrl, requestOptions);

    // if (userId != undefined) {
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! Status: ${response.status}`);
    //   }

    //   console.log(response);
    //   const responseData = await response.json();
    //   const userEmail = responseData;

    //   // console.log(userId);
    //   console.log("User Email: ", userEmail);
    const user = await clerkClient.users.getUser(userId);
    // const email = await user.firstName;
    // console.log(user);

    return user;
  } catch (error) {
    console.error("Error fetching user profile:  ", error);
    throw new Error("Failed to fetch user email");
  }
}

export async function getUserNameById(userId: string) {
  try {
    const user = await clerkClient.users.getUser(userId);

    // Return full name if both first and last name exist
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    // Return first name if only first name exists
    if (user.firstName) {
      return user.firstName;
    }

    // Return username or email as fallback
    return user.username || user.emailAddresses[0].emailAddress;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
