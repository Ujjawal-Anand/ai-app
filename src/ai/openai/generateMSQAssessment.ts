// generate MSQ assessment

import { Question } from "@/types/assessment";
import { getSystemAssessmentPrompt } from "../prompts/systemPrompt";
import { MSQAssessmentTool } from "../tools/generateMSQ";
import { getChatCompletion } from "./openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { createQuestionPaper } from "@/db/questionPaper";

export const generateMSQAssessment = async (
  subject: string,
  careerLevel: string,
  numQuestions: number,
  customGuidelines?: string
) => {
  const systemPrompt = getSystemAssessmentPrompt(subject);
  const messages = [
    {
      role: "system",
      name: "Interview assessment generator",
      content: systemPrompt,
    },
    {
      role: "user",
      name: "Interview assessment generator",
      content: `
      Generate MCQ assessment:
            Technology for which you need to assess candidate: ${subject}
- Career level for which you need to hire: ${careerLevel}
- Minimum number of questions that you need to generate: ${numQuestions}
 
${customGuidelines ? customGuidelines : ""}
            `,
    },
  ] as ChatCompletionMessageParam[];

  const tools = [
    {
      type: "function",
      function: MSQAssessmentTool,
    },
  ];

  const response = await getChatCompletion(messages, tools);

  const responseMessage = response.choices[0].message;

  const toolCalls = responseMessage.tool_calls;

  const functions = {
    generateMSQAssessment: (
      questionPaperData: {
        subject: string;
        type: string;
        numQuestions: number;
        careerLevel: string;
      },
      data: Question[],
      userId: string
    ) => createQuestionPaper(questionPaperData, data, userId),
  };

  if (toolCalls) {
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionToCall = functions[functionName as keyof typeof functions]; // Add index signature
      const functionArgs = JSON.parse(toolCall.function.arguments);

      // const functionResponse = await functionToCall(functionArgs);
    }
  }
};
