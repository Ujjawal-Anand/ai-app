// create a post route to submit the answer paper
// it should first check if the user is authenticated
// then check if the user has access to the question paper
// if the user has access to the question paper, update the answer paper
// else return 403

import { NextResponse } from "next/server";
import { getAssistantSystemPrompt } from "@/ai/prompts/assistant/base";
import { getChatCompletion } from "@/ai/openai/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { getUserFromClerkID } from "@/lib/db/query/user/getUser";
import { arrayToCommaSeparatedString } from "@/lib/string";
import {
  createChatAssistant,
  saveChatCompletion,
} from "@/lib/db/mutations/chat";

export const POST = async (request: Request) => {
  const { role, careerLevel, technologies } = await request.json();
  const user = await getUserFromClerkID();
  const userId = user?.id;
  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const SYSTEM_MESSAGE = getAssistantSystemPrompt(
    careerLevel,
    role,
    arrayToCommaSeparatedString(technologies)
  );

  const SYSTEM_ROLE_MESSAGE = {
    role: "system",
    content: SYSTEM_MESSAGE,
  } as ChatCompletionMessageParam;

  try {
    //Instantiate "PromptTemplate" passing the prompt template string initialized above
    // save the system message in db
    const assistant = await createChatAssistant({
      jobRole: role,
      careerLevel,
      technologies,
      chat: {
        userId,
        role: SYSTEM_ROLE_MESSAGE.role,
        content: SYSTEM_MESSAGE,
        totalTokens: 0,
      },
    });
    const response = await getChatCompletion([SYSTEM_ROLE_MESSAGE]);
    if (response.choices) {
      saveChatCompletion({
        chat: {
          userId,
          role: response.choices[0].message.role,
          content: response.choices[0].message.content || "",
          totalTokens: response?.usage?.total_tokens || 0,
        },
        assistantId: assistant.id,
      });

      return NextResponse.json({
        assistantId: assistant.id,
        message: response.choices[0].message.content,
      });
    }

    return new NextResponse("Failed to get response from ai server", {
      status: 501,
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      error: (e as Error)?.message ?? "Failed to submit answer paper",
    });
  }
};
