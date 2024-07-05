import { AssessmentType } from "@/types/assessment";
import { z } from "zod";
import {
  codeSnippetSchema,
  mcqSchema,
  mixAllSchema,
  mixMcqMsqSchema,
  msqZodSchema,
  subjectiveSchema,
} from ".";

// Define the base schema for an option
export const optionSchema = z.object({
  text: z.string().describe("The option text which belong to question"),
  correct: z.boolean().describe("Is this option correct"),
  score: z
    .number()
    .describe(
      "The score which is awarded to user. 10 if this is correct answer, 0 if wrong"
    ),
});

// Define the base schema for a question without the 'type' field
export const baseQuestionSchema = z.object({
  text: z
    .string()
    .describe(
      "The question that you want to ask interviewer to assess their knowledge"
    ),
  topics: z.array(
    z.string().describe("The topics to which the question belongs")
  ),
});

export const getSchema = (type: AssessmentType) => {
  switch (type) {
    case "mcq":
      return mcqSchema;
    case "msq":
      return msqZodSchema;
    case "subjective":
      return subjectiveSchema;
    case "code_snippet":
      return codeSnippetSchema;
    case "mix-1-mcq+msq":
      return mixMcqMsqSchema;
    case "mix-2-mcq+msq+subjective+code_snippet":
      return mixAllSchema;
    default:
      return mcqSchema;
  }
};
