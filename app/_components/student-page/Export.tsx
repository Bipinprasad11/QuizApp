"use client";

import styles from "@/app/_style/student-page-style/Export.module.css";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React from "react";

interface ExportProps {
  pdfRef: React.RefObject<HTMLDivElement>;
}

export default function Export({ pdfRef }: ExportProps) {
  const router = useRouter();

  function handleBackToHomeButton() {
    router.push("/student");
  }

  async function handleExportPDF() {
    if (!pdfRef.current) {
      alert("PDF content not found");
      return;
    }

    const canvas = await html2canvas(pdfRef.current, {
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("score-report.pdf");
  }

  return (
    <div className={styles.container}>
      <button className={styles.back} onClick={handleBackToHomeButton}>
        Back to home
      </button>

      <button className={styles.back} onClick={handleExportPDF}>
        Export PDF
      </button>
    </div>
  );
}
