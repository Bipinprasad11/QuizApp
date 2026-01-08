"use client";

import styles from "@/app/_style/student-page-style/ScoreCard.module.css";

type ScoreCardData = {
  question: string;
  correctAnswer: string;
  selectedAnswer: string | undefined;
};

interface ScoreCardProps {
  data: ScoreCardData;
  index: number;
}

export default function ScoreCard({ data, index }: ScoreCardProps) {
  const isCorrect = data.selectedAnswer === data.correctAnswer;

  return (
    <div
      className={`${styles.container} ${
        isCorrect ? styles.correct : styles.wrong
      }`}
    >
      <p className={styles.title}>
        Q.{index + 1}
        <span>{data.question}</span>
      </p>

      <p className={styles.answer}>
        Your Answer : {data.selectedAnswer ?? "Not Answered"}
      </p>

      <p className={styles.answer}>
        Correct Answer : {data.correctAnswer}
      </p>
    </div>
  );
}
