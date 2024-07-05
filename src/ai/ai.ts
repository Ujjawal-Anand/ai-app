import { AssessmentType, CareerLevel, Subject } from "@/types/assessment";
import { OutputFixingParser } from "langchain/output_parsers";
import { getSchema } from "./prompts/schema";
import { PromptTemplate } from "@langchain/core/prompts";
import { SYSTEM_PROMPT } from "./prompts/systemPrompt";
import { OpenAI } from "@langchain/openai";
import { getModel, getParser } from "./base";

const getPrompt = async (
  subject: Subject,
  type: AssessmentType,
  careerLevel: CareerLevel,
  numQuestions: number,
  customGuidelines?: string
) => {
  const formatInstructions = getParser(getSchema(type)).getFormatInstructions();

  const prompt = new PromptTemplate({
    template: SYSTEM_PROMPT,
    inputVariables: [
      "subject",
      "careerLevel",
      "numQuestions",
      "customGuidelines",
    ],
    partialVariables: { formatInstructions },
  });

  const input = await prompt.format({
    subject,
    careerLevel,
    numQuestions,
    customGuidelines,
  });

  return input;
};

export const generateAssessment = async (
  subject: Subject,
  type: AssessmentType,
  careerLevel: CareerLevel,
  numQuestions: number,
  customGuidelines?: string
) => {
  const input = await getPrompt(
    subject,
    type,
    careerLevel,
    numQuestions,
    customGuidelines
  );
  const model: OpenAI = getModel();
  const output = await model.invoke(input);
  const parser = getParser(getSchema(type));

  try {
    return parser.parse(output);
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(model, parser);
    const fix = await fixParser.parse(output);
    return fix;
  }
};
