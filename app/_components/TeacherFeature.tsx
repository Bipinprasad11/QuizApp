import styles from "../_style/TeacherFeature.module.css";

export default function TeacherFeature() {
  return (
    <div>
      <h1 className={styles.text}>Teacher Feature</h1>
      <div className={styles.container}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>➕</div>
          <div>
            <h3 className={styles.textLine1}>Create Quizzes</h3>
            <p className={styles.textLine2}>Design and publish new quizzes</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📝</div>
          <div>
            <h3 className={styles.textLine1}>My Quizzes</h3>
            <p className={styles.textLine2}>Manage your created quizzes</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📊</div>
          <div>
            <h3 className={styles.textLine1} >View Results</h3>
            <p className={styles.textLine2}>Monitor student performance</p>
          </div>
        </div>
      </div>
    </div>
  );
}
