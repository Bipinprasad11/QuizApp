"use client";

import { useState, useEffect } from "react";
import styles from "@/app/_style/student-page-style/QuizList.module.css";
import Quizcard from "@/app/_components/student-page/Quizcard";
import { FaRegClock } from "react-icons/fa";
import { useRouter } from "next/navigation";
import type {
  Question,
  QuestionStore,
} from "@/app/_components/_types/Question";
import NoQuestion from "./NoQuestion";

const QUIZ_STATE_KEY = "activeQuiz";

export default function QuizList() {
  const router = useRouter();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [quizStarted, setQuizStarted] = useState<boolean>(false);
  const [answers, setAnswers] = useState<(string | null)[]>([]);
  const [tempAnswer, setTempAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //Load quiz
  useEffect(() => {
    const savedQuiz = sessionStorage.getItem(QUIZ_STATE_KEY);

    if (savedQuiz) {
      const parsed = JSON.parse(savedQuiz);

      setQuestions(parsed.questions);
      setCurrentIndex(parsed.currentIndex);
      setAnswers(parsed.answers);
      setTimeLeft(parsed.timeLeft);
      setQuizStarted(true);
      setIsLoading(false);
      return;
    }

    const stored: QuestionStore = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );

    const sets = Object.keys(stored);

    //No questions added by teacher
    if (sets.length === 0) {
      setIsLoading(false);
      return;
    }

    const randomSet = sets[Math.floor(Math.random() * sets.length)];
    const loadedQuestions = stored[randomSet];

    const initialState = {
      questions: loadedQuestions,
      currentIndex: 0,
      answers: new Array(loadedQuestions.length).fill(null),
      timeLeft: loadedQuestions.length * 30,
    };

    sessionStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(initialState));

    setQuestions(initialState.questions);
    setAnswers(initialState.answers);
    setTimeLeft(initialState.timeLeft);
    setQuizStarted(true);
    setIsLoading(false);
  }, []);

  /* Persist quiz state */
  useEffect(() => {
    if (!quizStarted) return;

    const quizState = {
      questions,
      currentIndex,
      answers,
      timeLeft,
    };

    sessionStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(quizState));
  }, [questions, currentIndex, answers, timeLeft, quizStarted]);

  const handleAnswerSelect = (answer: string) => {
    setTempAnswer(answer);
  };

  const handleSubmit = () => {
    const attempt = {
      questions,
      answers,
      submittedAt: Date.now(),
    };

    localStorage.setItem("quizAttempt", JSON.stringify(attempt));
    sessionStorage.removeItem(QUIZ_STATE_KEY);
    router.push("/student/quiz/result");
  };

  /* Timer */
  useEffect(() => {
    if (!quizStarted) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, quizStarted]);

  /* Restore selected answer when navigating */
  useEffect(() => {
    setTempAnswer(answers[currentIndex] ?? null);
  }, [currentIndex, answers]);

  if (isLoading) {
    return <p>Loading quiz...</p>;
  }

  if (!isLoading && questions.length === 0) {
    return <NoQuestion />;
  }

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleSaveAndNext = () => {
    if (!tempAnswer) {
      alert("Please select an answer");
      return;
    }

    setAnswers((prev) => {
      const updated = [...prev];
      updated[currentIndex] = tempAnswer;
      return updated;
    });

    setTempAnswer(null);

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handleNext = () => {
    setTempAnswer(null);
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  };

  return (
    <div className={styles.mainContainer}>
      {/* Header */}
      <div className={styles.container}>
        <div className={styles.alignment}>
          <h1 className={styles.title}>Quiz Assessment</h1>
          <p className={styles.progressStat}>
            Question {currentIndex + 1} of {totalQuestions}
          </p>
        </div>

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className={styles.alignment}>
          <div className={styles.timer}>
            <FaRegClock />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <button className={styles.submit} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>

      {/* Question */}
      <Quizcard
        question={currentQuestion}
        questionNumber={currentIndex + 1}
        selectedAnswer={tempAnswer}
        onSelectAnswer={handleAnswerSelect}
      />

      {/* Navigation */}
      <div className={styles.buttonsContainer}>
        <button
          className={styles.buttons}
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        <div className={styles.align}>
          <button className={styles.save} onClick={handleSaveAndNext}>
            Save & Next
          </button>

          <button
            className={styles.buttons}
            onClick={handleNext}
            disabled={currentIndex === totalQuestions - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
