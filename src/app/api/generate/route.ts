import { NextResponse } from "next/server";
import { CareerLevel, Question } from "@/types/assessment";
import { getUserFromClerkID } from "@/lib/db/query/user/getUser";
import { createQuestionPaper } from "@/lib/db/mutations/question-paper";
import { generateAssessment } from "@/ai/ai";

export const POST = async (request: Request) => {
  const user = await getUserFromClerkID();
  const { subject, type, numQuestions, careerLevel, customGuidelines } =
    await request.json();
  const assessmentType = type?.toLowerCase();
  if (!user) {
    return new NextResponse("Unauthorized", { status: 401 });
  } else if (!subject || !type || !numQuestions || !careerLevel) {
    return new NextResponse("Bad Request", { status: 400 });
  }

  const data = await generateAssessment(
    subject,
    assessmentType,
    careerLevel,
    numQuestions,
    customGuidelines
  );

  // save data to the database using prisma

  const questionPaperId = await createQuestionPaper(
    { subject, type, numQuestions, careerLevel },
    data as Question[],
    user.id
  );

  return NextResponse.json({
    questionPaperId,
  });
};
