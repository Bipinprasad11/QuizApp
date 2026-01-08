"use client";

import { useState } from "react";
import Modal from "react-modal";
import styles from "@/app/_style/teacher-page-style/AddQuestionModal.module.css";
import toast from "react-hot-toast";
import { QuestionType } from "../_types/Question";

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

export default function AddQuestionModal({
  isOpen,
  onClose,
  onAdded,
}: AddQuestionModalProps) {
  const [question, setQuestion] = useState("");
  const [selectedSet, setSelectedSet] = useState("set1");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [questionType, setQuestionType] =
    useState<QuestionType>("true_false");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!question.trim() || !correctAnswer.trim()) {
      toast.error("Please fill all fields");
      return;
    }

    const stored: QuestionStore = JSON.parse(
      localStorage.getItem("questions") || "{}"
    );

    if (!stored[selectedSet]) {
      stored[selectedSet] = [];
    }

    stored[selectedSet].push({
      id: Date.now(),
      question: question.trim(),
      correctAnswer: correctAnswer.trim(),
      type: questionType,
    });

    localStorage.setItem("questions", JSON.stringify(stored));

    setQuestion("");
    setCorrectAnswer("");
    setSelectedSet("set1");
    setQuestionType("true_false");

    toast.success("Question Added Successfully!");

    onClose();
    onAdded();
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      overlayClassName={styles.overlay}
      className={styles.modal}
      contentLabel="Add Question"
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.header}>
          <h2>Add New Question</h2>
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
              onChange={(e) => {
                setQuestionType(e.target.value as QuestionType);
                setCorrectAnswer("");
              }}
            >
              <option value="true_false">True / False</option>
              <option value="short_answer">Short Answer</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Assign to Set</label>
            <select
              value={selectedSet}
              onChange={(e) => setSelectedSet(e.target.value)}
            >
              <option value="set1">Set 1</option>
              <option value="set2">Set 2</option>
              <option value="set3">Set 3</option>
            </select>
          </div>

          <div className={styles.field}>
            <label>Question</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter your question here..."
            />
          </div>

          <div className={styles.field}>
            <label>Correct Answer</label>

            {questionType === "true_false" ? (
              <select
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                <option value="">Select answer...</option>
                <option value="True">True</option>
                <option value="False">False</option>
              </select>
            ) : (
              <input
                className={styles.answer}
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
            Add Question
          </button>
        </div>
      </form>
    </Modal>
  );
}
