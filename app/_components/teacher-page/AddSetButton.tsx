"use client";

import styles from "@/app/_style/teacher-page-style/AddSetButton.module.css";

interface AddSetButtonProps {
  selectedSet: string;
  onSelectSet: (set: string) => void;
}

export default function AddSetButton({
  selectedSet,
  onSelectSet,
}: AddSetButtonProps) {
  return (
    <div className={styles.container}>
      {["set1", "set2", "set3"].map((set) => (
        <button
          key={set}
          className={`${styles.addButton} ${
            selectedSet === set ? styles.active : ""
          }`}
          onClick={() => onSelectSet(set)}
        >
          {set.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
