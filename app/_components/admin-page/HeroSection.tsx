import styles from "@/app/_style/admin-page-style/HeroSection.module.css";
import QuestionSet from "./QuestionSet";
import Tecaher from "./Teacher";
import Student from "./Student";

export default function HeroSection() {
  return (
    <>
      <div className={styles.text}>
        <h1 className={styles.textLine1}>Admin Dashboard</h1>
        <p className={styles.textLine2}>
          Manage your quiz system and monitor activity.
        </p>
      </div>
      <div className={styles.container}>
        <QuestionSet/>
        <Tecaher/>
        <Student/>
      </div>
    </>
  );
}
