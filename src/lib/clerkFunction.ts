import axios from "axios";

const { CLERK_SECRET_KEY } = process.env;

export async function getUserEmailById(userId: string | null) {
  const apiUrl = `https://api.clerk.io/v1/users/${userId}`;

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      "Content-type": "application/json",
    },
  };

  try {
    const response = await fetch(apiUrl, requestOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();
    const userEmail = responseData;

    console.log(userId);
    console.log("User Email: ", userEmail);
    return userEmail;
  } catch (error) {
    console.error("Error fetching user profile: ", error);
    throw new Error("Failed to fetch user email");
  }
}
