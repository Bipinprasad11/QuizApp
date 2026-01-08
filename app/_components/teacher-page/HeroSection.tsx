"use client";

import styles from "@/app/_style/teacher-page-style/HeroSection.module.css";
import AddQuestionButton from "./AddQuestionButton";
import AddSetButton from "./AddSetButton";
import QuestionList from "./QuestionList";
import { useState } from "react";

export default function HeroSection() {
  const [selectedSet, setSelectedSet] = useState<string>("set1");
  const [refreshKey, setRefreshKey] = useState<number>(0);

  const handleQuestionAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <>
      <div className={styles.text}>
        <h1 className={styles.textLine1}>Teacher Dashboard</h1>
        <p className={styles.textLine2}>
          Create and manage quiz questions for your students.
        </p>
      </div>

      <div className={styles.mainContainer}>
        <div className={styles.container}>
          <p className={styles.manageText}>Question Management</p>
          <AddQuestionButton onQuestionAdded={handleQuestionAdded}/>
        </div>

        <AddSetButton
          selectedSet={selectedSet}
          onSelectSet={setSelectedSet}
        />

        <QuestionList
          selectedSet={selectedSet}
          refreshKey={refreshKey}
        />
      </div>
    </>
  );
}
