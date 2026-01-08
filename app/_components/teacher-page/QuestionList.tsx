"use client";

import { useMemo, useState } from "react";
import styles from "@/app/_style/teacher-page-style/QuestionList.module.css";
import { toast } from "react-hot-toast";
import type {
  Question,
  QuestionStore,
} from "@/app/_components/_types/Question";
import ConfirmModal from "./handleDelete";
import EditQuestionModal from "./EditQuestionModal";

interface QuestionListProps {
  selectedSet: string;
  refreshKey: number;
}

export default function QuestionList({
  selectedSet,
  refreshKey,
}: QuestionListProps) {
  const [version, setVersion] = useState<number>(0);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editQuestion, setEditQuestion] = useState<Question | null>(null);

  const questions = useMemo<Question[]>(() => {
    if (typeof window === "undefined") return [];

    const stored: QuestionStore = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );

    return stored[selectedSet] ?? [];
  }, [selectedSet, version, refreshKey]);

  function handleDelete(questionId: number) {
    const stored: QuestionStore = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );

    if (!stored[selectedSet]) return;

    stored[selectedSet] = stored[selectedSet].filter(
      (q) => q.id !== questionId
    );

    if (stored[selectedSet].length === 0) {
      delete stored[selectedSet];
    }

    localStorage.setItem("questions", JSON.stringify(stored));
    setVersion((v) => v + 1);

    toast.success("Question deleted successfully!");
  }

  if (questions.length === 0) {
    return <p className={styles.empty}>No questions in this set.</p>;
  }

  return (
    <>
      <div className={styles.list}>
        {questions.map((q, index) => (
          <div key={q.id} className={styles.card}>
            <div className={styles.mainContainer}>
              <p className={styles.questionType}>
                {q.type === "true_false" ? "True / False" : "Short Answer"}
              </p>

              <div className={styles.container}>
                <span
                  className={styles.edit}
                  onClick={() => setEditQuestion(q)}
                >
                  Edit
                </span>

                <span
                  className={styles.delete}
                  onClick={() => setDeleteId(q.id)}
                >
                  Delete
                </span>
              </div>
            </div>

            <p>
              <strong>Q{index + 1}.</strong> {q.question}
            </p>

            <p className={styles.answer}>
              <strong>Correct Answer:</strong> {q.correctAnswer}
            </p>
          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Delete Question"
        message="Are you sure you want to delete this question?"
        onCancel={() => setDeleteId(null)}
        onConfirm={() => {
          if (deleteId !== null) {
            handleDelete(deleteId);
            setDeleteId(null);
          }
        }}
      />
      <EditQuestionModal
        isOpen={editQuestion !== null}
        questionData={editQuestion}
        selectedSet={selectedSet}
        onClose={() => setEditQuestion(null)}
        onUpdated={() => {
          setVersion((v) => v + 1);
          setEditQuestion(null);
        }}
      />
    </>
  );
}
