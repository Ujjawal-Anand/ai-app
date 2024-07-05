import { CareerLevel, Question } from "@/types/assessment";
import { prisma } from "../../prisma";

export const createQuestionPaper = async (
  questionPaperData: {
    subject: string;
    type: string;
    numQuestions: number;
    careerLevel: string;
  },
  questions: Question[],
  userId: string
) => {
  const questionPaper = {
    subject: questionPaperData.subject,
    type: questionPaperData.type,
    careerLevel: questionPaperData.careerLevel as CareerLevel,
    creator: {
      connect: {
        id: userId,
      },
    },
    questions: {
      create: questions.map((question) => {
        return {
          text: question.text,
          description: question.description,
          topics: question.topics.join(","),
          type: question.type,
          user: {
            connect: {
              id: userId,
            },
          },
          options: {
            create: question.options?.map((option) => {
              return {
                text: option.text,
                correct: option.correct,
                score: option.score,
              };
            }),
          },
        };
      }),
    },
  };

  const assessment = {
    title: `Assessment for ${questionPaperData.subject} - ${questionPaperData.careerLevel}`,
    createdBy: {
      connect: {
        id: userId,
      },
    },
    questionPaper: {
      create: questionPaper,
    },
  };

  const createdAssessment = await prisma.assessment.create({
    data: assessment,
  });

  return createdAssessment.id;
};
