import { CareerLevel, Subject } from "@/types/assessment";
import { OutputFixingParser } from "langchain/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { OpenAI } from "@langchain/openai";
import { getModel, getParser } from "@/ai/base";
import { subjectiveQuestionEvaluationSchema } from "@/ai/prompts/schema/evaluation/schema";
import { EVALUATION_SYSTEM_PROMPT } from "@/ai/prompts/evaluation/systemPrompt";

const getPrompt = async (
  subject: string,
  careerLevel: string,
  questionText: string,
  answer: string,
  maxScore: number
) => {
  const formatInstructions = getParser(
    subjectiveQuestionEvaluationSchema
  ).getFormatInstructions();
  const prompt = new PromptTemplate({
    template: EVALUATION_SYSTEM_PROMPT,
    inputVariables: [
      "subject",
      "careerLevel",
      "questionText",
      "answer",
      "maxScore",
    ],
    partialVariables: { formatInstructions },
  });

  const input = await prompt.format({
    subject,
    careerLevel,
    questionText,
    answer,
    maxScore,
  });

  return input;
};

export const generateEvaluation = async (
  subject: string,
  careerLevel: string,
  questionText: string,
  answer: string,
  maxScore: number
) => {
  const input = await getPrompt(
    subject,
    careerLevel,
    questionText,
    answer,
    maxScore
  );
  const model: OpenAI = getModel();
  const output = await model.invoke(input);
  const parser = getParser(subjectiveQuestionEvaluationSchema);

  try {
    return parser.parse(output);
  } catch (e) {
    const fixParser = OutputFixingParser.fromLLM(model, parser);
    const fix = await fixParser.parse(output);
    return fix;
  }
};
