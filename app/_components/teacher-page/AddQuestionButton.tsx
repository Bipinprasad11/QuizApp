"use client";

import { useState } from "react";
import AddQuestionModal from "./AddQuestionModal";
import styles from "@/app/_style/teacher-page-style/AddQuestionButton.module.css";

type AddQuestionButtonProps = {
  onQuestionAdded: () => void;
};

export default function AddQuestionButton({
  onQuestionAdded,
}: AddQuestionButtonProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <button
        className={styles.addButton}
        onClick={() => setOpen(true)}
      >
        Add Question
      </button>

      <AddQuestionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAdded={onQuestionAdded}
      />
    </>
  );
}
