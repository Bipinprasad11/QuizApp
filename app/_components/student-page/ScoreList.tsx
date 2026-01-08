"use client";

import styles from "@/app/_style/student-page-style/ScoreList.module.css";
import { useEffect, useState, useRef } from "react";
import ScoreCard from "@/app/_components/student-page/ScoreCard";
import Export from "./Export";

export default function ScorePage() {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [evaluated, setEvaluated] = useState([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const attempt = JSON.parse(localStorage.getItem("quizAttempt"));
    if (!attempt) return;

    const evaluatedResult = attempt.questions.map((q, index) => {
      const selected = attempt.answers[index];

      return {
        question: q.question,
        correctAnswer: q.correctAnswer,
        selectedAnswer: selected,
        isCorrect: selected === q.correctAnswer,
      };
    });

    setEvaluated(evaluatedResult);
    setScore(evaluatedResult.filter((r) => r.isCorrect).length);
  }, []);

  if (evaluated.length === 0) {
    return <p>Loading score...</p>;
  }

  return (
    <>
      <div ref={pdfRef} className={styles.container}>
        <h1 className={styles.title}>
          Your Score: {score} / {evaluated.length}
        </h1>

        {evaluated.map((item, index) => (
          <ScoreCard key={index} data={item} index={index} />
        ))}
        <Export pdfRef={pdfRef}/>
      </div>
    </>
  );
}
