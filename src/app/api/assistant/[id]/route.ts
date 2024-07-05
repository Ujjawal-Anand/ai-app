import { NextResponse } from "next/server";
import { getChatCompletion } from "@/ai/openai/openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { getChatHistory, saveChatCompletion } from "@/db/chat";
import { getUserFromClerkID } from "@/utils/auth";
import { USER_ROLE } from "@/constants";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const assistantId = params.id;
  const user = await getUserFromClerkID();
  const userId = user?.id;
  if (!userId || !assistantId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const chatHistory = await getChatHistory(assistantId);

  return NextResponse.json({
    assistantId: assistantId,
    chats: chatHistory,
  });
};

export const POST = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  const { message } = await request.json();
  const assistantId = params.id;
  const user = await getUserFromClerkID();
  const userId = user?.id;
  if (!userId || !assistantId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const ROLE = USER_ROLE;

  const chatHistory = await getChatHistory(assistantId);
  const userMessage = {
    role: ROLE,
    content: message,
  } as ChatCompletionMessageParam;

  try {
    // save user message in db
    saveChatCompletion({
      chat: {
        userId,
        role: ROLE,
        content: message,
        totalTokens: 0,
      },
      assistantId: assistantId,
    });

    const response = await getChatCompletion([...chatHistory, userMessage]);
    if (response.choices) {
      saveChatCompletion({
        chat: {
          userId,
          role: response.choices[0].message.role,
          content: response.choices[0].message.content || "",
          totalTokens: response?.usage?.total_tokens || 0,
        },
        assistantId: assistantId,
      });

      return NextResponse.json({
        assistantId: assistantId,
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
