// function to generate evaluation
// generate MSQ assessment

import { getChatCompletion } from "./openai";
import { getEvaluationPrompt } from "../prompts/evaluation/systemPrompt";
import { evaluateAnswerTool } from "../tools/generateEvaluation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { saveAnswerFeedback } from "@/db/answer";

export const evaluateSubjectiveAnswer = async (
  subject: string,
  careerLevel: string,
  questionText: string,
  answer: string,
  maxScore: number,
  answerId: string
) => {
  const systemPrompt = getEvaluationPrompt();
  const messages = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: `
      Evaluate user's answer for the provided question
      Input:

Technology: ${subject}
Career Level: ${careerLevel}
Question: ${questionText}
Candidate Response: ${answer}
Maximum Score: ${maxScore}
            `,
    },
  ] as ChatCompletionMessageParam[];

  const tools = [
    {
      type: "function",
      function: evaluateAnswerTool,
    },
  ];

  const response = await getChatCompletion(messages, tools);

  const responseMessage = response.choices[0].message;

  const toolCalls = responseMessage.tool_calls;

  const functions = {
    evaluateAnswer: ({
      feedback,
      score,
    }: {
      feedback: string;
      score: number;
    }) => saveAnswerFeedback(answerId, feedback, score),
  };

  if (toolCalls) {
    for (const toolCall of toolCalls) {
      const functionName = toolCall.function.name;
      const functionToCall = functions[functionName as keyof typeof functions]; // Add index signature
      try {
        const functionArgs = JSON.parse(toolCall.function.arguments);
        await functionToCall(functionArgs);
        return;
      } catch (error) {
        evaluateSubjectiveAnswer(
          subject,
          careerLevel,
          questionText,
          answer,
          maxScore,
          answerId
        );
      }
    }
  }
};
