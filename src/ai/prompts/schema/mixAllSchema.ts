import { z } from "zod";
import { baseQuestionSchema, optionSchema } from "./baseSchema";

export const mixAllSchema = z.array(
  baseQuestionSchema.extend({
    type: z.enum(["mcq", "msq", "subjective", "code_snippet"]).describe(
      `Defines the type of the question.
        'mcq': multiple choice questions.
        'msq': multiple select questions.
        'subjective': subjective questions. 
        'code_snippet': question that will require user to code`
    ),
    options: z
      .array(optionSchema)
      .describe("This will be list of options")
      .min(0)
      .describe("if type is subjective or code_snippet")
      .max(4)
      .describe("if type is mcq or msq"),
  })
);
