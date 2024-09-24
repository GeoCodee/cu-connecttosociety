import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

//this line will avoid caching when deployed to vercel
//value options
// false | 0 | number
export const revalidate = 0;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

var description =
  "A nature enthusiast who finds peace in the outdoors, whether hiking through forests or simply soaking in the beauty of the natural world. They have a love for fiction, often getting lost in imaginative stories that transport them to new realms. With a keen sense of fashion, they enjoy expressing themselves through their unique style, blending creativity with the latest trends. They're also passionate about personal fitness, staying active and finding balance between mind and body as they work towards their health goals.";

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

export async function GET(req: any) {
  try {
    const profileDescription: OpenAI.Chat.ChatCompletionMessageParam = {
      role: "user",
      content: `${description}`,
    };

    if (!openai.apiKey) {
      return new NextResponse("OpenAI API Key not configured", { status: 500 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-2024-05-13",
      messages: [instructionMessage, profileDescription],
    });

    // console.log(response.choices[0].message);
    // const triviaQuestions = response.choices[0].message.content
    //   ? JSON.parse(response.choices[0].message.content)
    //   : "";

    const descriptionTags = response.choices[0].message.content
      ? JSON.parse(response.choices[0].message.content)
      : "";

    // return NextResponse.json(triviaQuestions);

    // // Set headers to disable caching
    // const headers = {
    //   "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    //   Pragma: "no-cache",
    //   Expires: "0",
    // };

    // Return the JSON response with headers
    return NextResponse.json(descriptionTags);
  } catch (error) {
    console.log("[Retrieve Tags Error]", error);
    return new NextResponse(`Internal Error: ${error}`, { status: 500 });
  }
}
