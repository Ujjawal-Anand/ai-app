import { AnswerPaper } from "@prisma/client";

export type Option = {
  text: string;
  correct: boolean;
  score: number;
  id: string;
};

type QuestionType = "mcq" | "msq" | "subjective" | "code_snippet";

export type Question = {
  text: string;
  topics: string[];
  type: QuestionType;
  id: string;
  options: Option[];
  description?: string;
};

export type Subject = "react" | "javascript" | "node" | "django" | "java";

export type CareerLevel =
  | "junior"
  | "developer"
  | "senior"
  | "lead"
  | "architect"
  | "principle"
  | "EM";

export type AssessmentType =
  | QuestionType
  | "mix-1-mcq+msq"
  | "mix-2-mcq+msq+subjective+code_snippet";

export interface AnswerPaperResponse {
  id: string;
  answers: {
    id: string;
    questionId: string;
    options: string[];
  }[];
  score: number;
  totalScore: number;
}
export interface QuestionPaperResponse {
  id: string;
  type: AssessmentType;
  subject: Subject;
  description?: string;
  careerLevel: CareerLevel;
  creatorId: string;
  questions: Question[];
}

export interface AssessmentResponse {
  id: string;
  title: string;
  userId: string;
  questionPaper: QuestionPaperResponse;
  answerPapers: AnswerPaperResponse[];
}
