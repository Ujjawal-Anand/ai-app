import { z } from "zod";
import { baseQuestionSchema, optionSchema } from "./baseSchema";

export const subjectiveSchema = z.array(
  baseQuestionSchema.extend({
    type: z.enum(["subjective"]).describe("Defines the type of the question."),
  })
);
