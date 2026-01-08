import styles from "../_style/HeroSection.module.css"
import RoleSelector from "./RoleSelector";

export default function Herosection() {
  return (
    <div className={styles.container}>
        <div className={styles.text}>
          <h1 className={styles.textLine1} >Welcome to Quiz Master</h1>
          <p className={styles.textLine2}>A comprehensive platform for creating, managing, and taking quizzes.<br/>Choose your role to explore features.</p>
        </div>
        <RoleSelector/>
    </div>
  );
}