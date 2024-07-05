"use client";
import GenerateOptions from "@/components/selects/GenerateOptions";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

const GenerateAssessment = () => {
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>(
    []
  );
  const [questionTypes, setQuestionTypes] = useState<string[]>([]);
  const [careerLevels, selectCareerLevel] = useState<string[]>([]);
  const [defaultValues, setDefaultValues] = useState({
    programmingLanguage: "",
    questionType: "",
    careerLevel: "",
  });
  const [isError, setError] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);

  const isEmpty =
    defaultValues.programmingLanguage === "" ||
    defaultValues.questionType === "" ||
    defaultValues.careerLevel === "";

  const getNumberOfQuestions = (type: string): number => {
    switch (type.toLowerCase()) {
      case "mcq":
        return +(process.env.NEXT_PUBLIC_MAX_MCQ_MSQ_QUESTIONS || 5);
      case "msq":
        return +(process.env.NEXT_PUBLIC_MAX_MCQ_MSQ_QUESTIONS || 5);
      case "subjective":
        return +(process.env.NEXT_PUBLIC_MAX_SUBJECTIVE_QUESTIONS || 5);
      case "code_snippet":
        return +(process.env.NEXT_PUBLIC_MAX_SUBJECTIVE_QUESTIONS || 5);
      default:
        return 5;
    }
  };

  useEffect(() => {
    const envProgrammingLanguages =
      process.env.NEXT_PUBLIC_PROGRAMMING_LANGUAGES || "javascript,typescript";
    const envQuestionTypes =
      process.env.NEXT_PUBLIC_QUESTION_TYPES || "mcq,code";
    const envCareerLevel =
      process.env.NEXT_PUBLIC_CAREER_LEVELS || "developer,engineer";

    if (envProgrammingLanguages) {
      setProgrammingLanguages(envProgrammingLanguages.split(","));
    }

    if (envQuestionTypes) {
      setQuestionTypes(envQuestionTypes.split(","));
    }

    if (envCareerLevel) {
      selectCareerLevel(envCareerLevel.split(","));
    }
  }, []);

  const onValidateBtnClick = () => {
    if (isEmpty) {
      // should show error
      setError(true);
      return;
    }
    // make post fetch call and add value in body
    const programmingLanguage = defaultValues.programmingLanguage;
    const questionType = defaultValues.questionType;
    const careerLevel = defaultValues.careerLevel;

    fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({
        subject: programmingLanguage,
        type: questionType,
        careerLevel,
        numQuestions: getNumberOfQuestions(questionType),
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      });

    // send({
    //   type: "GENERATE",
    //   subject: programmingLanguage,
    //   assessmentType: questionType,
    //   careerLevel: careerLevel,
    //   numQuestions: getNumberOfQuestions(questionType),
    // });
  };

  return (
    <>
      <div className="flex-grow grid w-full md:grid-cols-3 gap-4 mt-8 mb-8">
        <div className="md:w-[200px]">
          <GenerateOptions
            selectedOption={defaultValues.programmingLanguage}
            setSelectedOption={(value) =>
              setDefaultValues({
                ...defaultValues,
                programmingLanguage: value,
              })
            }
            options={programmingLanguages}
            label="Programming Language"
            required={true}
          />
        </div>
        <div className="md:w-[200px]">
          <GenerateOptions
            selectedOption={defaultValues.questionType}
            setSelectedOption={(value) =>
              setDefaultValues({
                ...defaultValues,
                questionType: value,
              })
            }
            options={questionTypes}
            label="Question Type"
            required={true}
          />
        </div>
        <div className="md:w-[200px]">
          <GenerateOptions
            selectedOption={defaultValues.careerLevel}
            setSelectedOption={(value) =>
              setDefaultValues({ ...defaultValues, careerLevel: value })
            }
            options={careerLevels}
            label="Job Title"
            required={true}
          />
        </div>
        <Button onClick={onValidateBtnClick} ref={triggerButtonRef}>
          Generate
        </Button>
      </div>
    </>
  );
};

export default GenerateAssessment;
