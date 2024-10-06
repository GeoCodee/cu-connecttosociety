import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

//this line will avoid caching when deployed to vercel
//value options
// false | 0 | number
export const revalidate = 0;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const instructionMessage: ChatCompletionMessageParam = {
  role: "system",
  content: `
    You will give me tags in an array format based on a profile description I'll give you. Your response should not include anything aside from the array format

    - These are your only options when creating these tags
    [
      "Sports",
      "Video Games",
      "DIY",
      "Music",
      "Movies",
      "Technology",
      "Travel",
      "Cooking",
      "Fitness",
      "Art",
      "Photography",
      "Books",
      "Fashion",
      "Health",
      "Education"
    ]

    I will be giving the profile description in the next prompt
  `,
};

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json();

    if (!description) {
      return new NextResponse("Description is required", { status: 400 });
    }

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    const profileDescription: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "user",
      content: description,
    };

    const response = await openai.chat.completions.create({
      model: "gpt-4-0613",
      messages: [instructionMessage, profileDescription],
    });

    const descriptionTags = response.choices[0].message.content
      ? JSON.parse(response.choices[0].message.content)
      : [];

    return NextResponse.json(descriptionTags);
  } catch (error) {
    console.log("[Retrieve Tags Error]", error);
    return new NextResponse(`Internal Error: ${error}`, { status: 500 });
  }
}
