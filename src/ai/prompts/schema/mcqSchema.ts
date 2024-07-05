import { z } from "zod";
import { baseQuestionSchema, optionSchema } from "./baseSchema";

export const mcqSchema = z.array(
  baseQuestionSchema.extend({
    type: z
      .enum(["mcq"])
      .describe(
        "Defines the type of the question. 'mcq' for multiple choice questions."
      ),
    options: z
      .array(optionSchema)
      .describe("This will be list of options")
      .min(4),
  })
);
