import { OpenAI } from "@langchain/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { OpenAIWhisperAudio } from "langchain/document_loaders/fs/openai_whisper_audio";

export const getModel = () => {
  let model;
  if (!model) {
    model = new OpenAI({
      temperature: 0,
      modelName: "gpt-4o",
    });
  }
  return model;
};

export const getSpeechToTextModelLoader = (filePathORBlob: string | Blob) => {
  return new OpenAIWhisperAudio(filePathORBlob);
};

export const getParser = (zodSchema: any) =>
  StructuredOutputParser.fromZodSchema(zodSchema);
