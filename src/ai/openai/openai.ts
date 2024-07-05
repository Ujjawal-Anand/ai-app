import "dotenv/config";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getChatCompletion = async (
  messages: ChatCompletionMessageParam[],
  tools?: any
) => {
  console.log("input messages", messages);
  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    tools: tools,
    temperature: 0,
  });

  return response;
};
