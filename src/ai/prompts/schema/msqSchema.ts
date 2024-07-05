import { z } from "zod";
import { baseQuestionSchema, optionSchema } from "./baseSchema";

export const msqZodSchema = z.array(
  baseQuestionSchema.extend({
    type: z
      .enum(["msq"])
      .describe(
        "Defines the type of the question, msq means multi select multi select question."
      ),
    options: z
      .array(optionSchema)
      .describe(
        "This will be list of options, more than one options should be correct"
      )
      .min(4),
  })
);
