export const evaluateAnswerTool = {
  name: "evaluateAnswer",
  description: "Evaluate answer of question.",
  parameters: {
    type: "object",
    properties: {
      feedback: {
        type: "string",
        description: "detailed evaluation feedback of the response",
      },
      score: {
        type: "number",
        description: "score based on evaluation of the response",
      },
    },
    required: ["feedback", "score"],
  },
};
