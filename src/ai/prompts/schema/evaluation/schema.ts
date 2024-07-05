import { z } from "zod";

export const subjectiveQuestionEvaluationSchema = z.object({
  score: z.number().describe("score based on evaluation of the response"),
  feedback: z.string().describe("detailed evaluation feedback of the response"),
});
