"use client";

import styles from "@/app/_style/student-page-style/Quizcard.module.css";
import type { Question } from "@/app/_components/_types/Question";

interface QuizcardProps {
  question: Question;
  questionNumber: number;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

export default function Quizcard({
  question,
  questionNumber,
  selectedAnswer,
  onSelectAnswer,
}: QuizcardProps) {
  if (!question) return null;

  return (
    <div className={styles.quesContainer}>
      <p className={styles.question}>
        <span>Q.{questionNumber} </span>
        {question.question}
      </p>

      
      {question.type === "true_false" && (
        <>
          <p
            className={`${styles.ans} ${
              selectedAnswer === "True" ? styles.active : ""
            }`}
            onClick={() => onSelectAnswer("True")}
          >
            True
          </p>

          <p
            className={`${styles.ans} ${
              selectedAnswer === "False" ? styles.active : ""
            }`}
            onClick={() => onSelectAnswer("False")}
          >
            False
          </p>
        </>
      )}

      
      {question.type === "short_answer" && (
        <input
          type="text"
          className={styles.shortAnswer}
          value={selectedAnswer ?? ""}
          onChange={(e) => onSelectAnswer(e.target.value)}
          placeholder="Type your one-word answer"
        />
      )}
    </div>
  );
}
