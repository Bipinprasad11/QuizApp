"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import styles from "@/app/_style/teacher-page-style/EditQuestion.module.css";
import toast from "react-hot-toast";
import type { Question } from "@/app/_components/_types/Question";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

interface EditQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  selectedSet: string;
  questionData: Question | null;
}

export default function EditQuestionModal({
  isOpen,
  onClose,
  onUpdated,
  selectedSet,
  questionData,
}: EditQuestionModalProps) {
  const [question, setQuestion] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionType, setQuestionType] =
    useState<Question["type"]>("true_false");

  useEffect(() => {
    if (questionData) {
      setQuestion(questionData.question);
      setCorrectAnswer(questionData.correctAnswer);
      setQuestionType(questionData.type);
    }
  }, [questionData]);

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    if (!question || !correctAnswer) {
      toast.error("Please fill all fields");
      return;
    }

    const stored = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );

    const updatedList = stored[selectedSet].map((q: Question) =>
      q.id === questionData?.id
        ? {
            ...q,
            question,
            correctAnswer,
            type: questionType,
          }
        : q
    );

    stored[selectedSet] = updatedList;
    localStorage.setItem("questions", JSON.stringify(stored));

    toast.success("Question updated successfully!");

    onClose();
    onUpdated();
  }

  if (!questionData) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
      contentLabel="Edit Question"
    >
      <form onSubmit={handleUpdate}>
        <div className={styles.header}>
          <h2>Edit Question</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className={styles.body}>
          <div className={styles.field}>
            <label>Question Type</label>
            <select
              value={questionType}
              onChange={(e) =>
                setQuestionType(e.target.value as Question["type"])
              }
            >
              <option value="true_false">True / False</option>
              <option value="short_answer">Short Answer</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label>Correct Answer</label>

            {questionType === "true_false" ? (
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            ) : (
              <input
                type="text"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
                placeholder="Enter one-word answer"
              />
            )}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className={styles.addBtn}>
            Update Question
          </button>
        </div>
      </form>
    </Modal>
  );
}
