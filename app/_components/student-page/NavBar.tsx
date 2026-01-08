"use client";
import { useRouter } from "next/navigation";
import { useState} from "react";
import styles from "@/app/_style/teacher-page-style/NavBar.module.css";
import Image from "next/image";

export default function NavBar() {
  const router = useRouter();
  
  const [userName] = useState(() => {
    try {
      const userData = localStorage.getItem("currentUser");
      if (userData) {
        const parsedData = JSON.parse(userData);
        return parsedData?.name || "user";
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
    return "user";
  });



  function handleLogout() {
    localStorage.removeItem("currentUser");
    router.push("/");
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Image src="/logo.jpg" alt="logo" height={120} width={120} />
        <div className={styles.column}>
          <p className={styles.textLine1}>Quiz Master</p>
          <p className={styles.textLine2}>Learning Made Simple</p>
        </div>
      </div>
      <div className={styles.textColumn}>
        <p>Hi, {userName}!</p>
        <button className={styles.button} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}