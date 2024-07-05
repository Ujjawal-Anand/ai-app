import { z } from "zod";
import { baseQuestionSchema, optionSchema } from "./baseSchema";

export const mixMcqMsqSchema = z.array(
  baseQuestionSchema.extend({
    type: z
      .enum(["mcq", "msq"])
      .describe(
        "Defines the type of the question. 'mcq': multiple choice questions. 'msq': multiple select questions"
      ),
    options: z
      .array(optionSchema)
      .describe("This will be list of options")
      .min(4),
  })
);
