import { z } from "zod";
import { baseQuestionSchema, optionSchema } from "./baseSchema";

export const codeSnippetSchema = z.array(
  baseQuestionSchema.extend({
    type: z
      .enum(["code_snippet"])
      .describe(
        "Defines the type of the question, the question should require user to write some code."
      ),
  })
);
