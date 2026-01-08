'use client'
import styles from "@/app/_style/Result.module.css";
import { useRouter } from "next/navigation";

export default function Result(){
    const router=useRouter();

    function handleScoreButton(){
        router.push("/student/quiz/result/score")
    }
    return (
        <>
        <div className={styles.container}>
        <h1 className={styles.title}>You have successfully Completed the Quiz.</h1>
        <button className={styles.score} onClick={handleScoreButton}>View Score</button>
        </div>
        </>
    )
}