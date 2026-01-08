'use client'
import styles from "@/app/_style/student-page-style/HeroSection.module.css"
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const router=useRouter();
  
  function handleQuizButton(){
    router.push("/student/quiz")
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.text}>
        <h1 className={styles.textLine1}>Student Dashboard</h1>
        <p className={styles.textLine2}>
          Complete your assigned quizzes.
        </p>
      </div>
      <div className={styles.container}>
        <h3 className={styles.textLine11}>Welcome, Student</h3>
        <p className={styles.textLine22}>Complete your assigned quizzes</p>
      </div>

      <div className={styles.startContainer}>
        <Image src="/logo.jpg" alt="logo" height={120} width={120}/>
        <h3 className={styles.startText1}>Start Your Quiz</h3>
        <p className={styles.startText2}>Click below to receive your randomly assigned quiz set</p>
        <button className={styles.startButton} onClick={handleQuizButton}>Get My Quiz</button>
      </div>
    </div>
  );
}
