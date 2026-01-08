export type QuestionType = "true_false" | "short_answer";

export type Question = {
  id: number;
  question: string;
  correctAnswer: string;
  type: QuestionType;
};

export type QuestionStore = {
  [setName: string]: Question[];
};
