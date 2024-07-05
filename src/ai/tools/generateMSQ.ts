export const MSQAssessmentTool = {
  name: "generateMSQAssessment",
  description: "generate MSQ assessment",
  parameters: {
    type: "object",
    properties: {
      data: {
        type: "array",
        description: "List of questions with their options for msq assessment",
        items: {
          text: {
            type: "string",
            description:
              "The question that you want to ask interviewer to assess their knowledge",
          },
          topics: {
            type: "array",
            items: {
              type: "string",
              description: "The topics to which the question belongs",
            },
            required: ["type"],
          },
          options: {
            type: "array",
            description:
              "This will be list of options, more than one options should be correct",
            items: {
              text: {
                type: "string",
                description: "The option text which belong to question",
              },
              correct: {
                type: "boolean",
                description: "Is this option correct",
              },
              score: {
                type: "number",
                description:
                  "The score which is awarded to user. 10 if this is correct answer, 0 if wrong",
              },
            },
            required: ["text", "correct", "score"],
          },
        },
        required: ["text", "topics", "options"],
      },
    },
    required: ["data"],
  },
};
