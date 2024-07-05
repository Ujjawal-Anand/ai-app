// create chat assistant and chat completion
//

import { Chat, ChatAssistant } from "@/types/chatAssistant";
import { prisma } from "../../prisma";

const getChatCompletion = ({ userId, role, content, totalTokens }: Chat) => ({
  role,
  content,
  totalTokens,
  createdBy: {
    connect: {
      id: userId,
    },
  },
});

export const createChatAssistant = async ({
  jobRole,
  careerLevel,
  technologies,
  chat,
}: ChatAssistant) => {
  // create assistant model in db and save chat
  // return assistant model
  const assistant = await prisma.assistant.create({
    data: {
      createdBy: {
        connect: {
          id: chat.userId,
        },
      },
      jobRole,
      careerLevel,
      technologies: technologies.join(","),
      chats: {
        create: getChatCompletion(chat),
      },
    },
  });

  return assistant;
};

export const saveChatCompletion = async ({
  chat,
  assistantId,
}: {
  chat: Chat;
  assistantId: string;
}) => {
  // save chat completion in db
  // return chat completion model
  const chatResponse = await prisma.chat.create({
    data: {
      assistant: {
        connect: {
          id: assistantId,
        },
      },
      ...getChatCompletion(chat),
    },
  });

  return chatResponse;
};

export const getChatHistory = async (assistantId: string) => {
  // return chat history of an assistant
  const chats = await prisma.chat.findMany({
    where: {
      assistantId,
    },
    orderBy: { createdAt: "asc" },
  });

  return chats.map((chatMessage: Chat) => ({
    role: chatMessage.role,
    content: chatMessage.content,
  }));
};
