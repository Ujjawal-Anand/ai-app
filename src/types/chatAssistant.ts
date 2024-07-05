export type ChatAssistant = {
  jobRole: string;
  careerLevel: string;
  technologies: string[];
  chat: Chat;
};

export type Chat = {
  userId: string;
  role: string;
  content: string;
  totalTokens: number;
};
