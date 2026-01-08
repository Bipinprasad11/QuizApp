"use client";

import Modal from "react-modal";
import styles from "@/app/_style/teacher-page-style/ConfirmDelete.module.css";

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

if (typeof window !== "undefined") {
  Modal.setAppElement("body");
}

export default function ConfirmModal({
  isOpen,
  title = "Confirm Action",
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <h3 className={styles.title}>{title}</h3>

      <p className={styles.confirmText}>{message}</p>

      <div className={styles.confirmActions}>
        <button
          type="button"
          className={styles.cancelBtn}
          onClick={onCancel}
        >
          Cancel
        </button>

        <button
          type="button"
          className={styles.confirmBtn}
          onClick={onConfirm}
        >
          Delete
        </button>
      </div>
    </Modal>
  );
}
