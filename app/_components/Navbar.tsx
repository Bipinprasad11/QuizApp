"use client"

import { useRouter } from "next/navigation";
import styles from "../_style/NavBar.module.css";
import Image from "next/image";

export default function NavBar() {
  const router=useRouter();

  function handleSignin(){
    router.push("/signup");
  }
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <Image src="/logo.jpg" alt="logo" height={120} width={120}/>
        <div className={styles.column}>
          <p className={styles.textLine1}>Quiz Master</p>
          <p className={styles.textLine2}>Learning Made Simple</p>
        </div>
      </div>
      <button className={styles.button} onClick={handleSignin}>Sign Up</button>
    </div>
  );
}
