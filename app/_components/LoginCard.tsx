"use client"

import { useRouter } from "next/navigation";
import styles from "../_style/LoginCard.module.css"

export default function LoginCard() {
  const router=useRouter();

  function handleSignin(){
    router.push("/signup");
  }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Ready to Get Started?</h2>
      <p className={styles.subtitle}>
        Join thousands of educators and students using Quiz Master to enhance
        learning experiences.
      </p>

      <button className={styles.button} onClick={handleSignin}>Sign In</button>
    </div>
  );
}
