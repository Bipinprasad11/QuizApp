'use client'

import styles from "@/app/_style/student-page-style/Noquestion.module.css";
import { useRouter } from "next/navigation";

export default function NoQuestion (){
    const router=useRouter();
    function handleBackButton(){
        router.push("/student")
    }
    return (
        <>
        <div className={styles.container}>
            <h2 className={styles.title}>No Quiz Is Available! Try Again Later</h2>
            <button className={styles.backButton} onClick={handleBackButton}>Back To Home</button>
        </div>
        </>
    )
}