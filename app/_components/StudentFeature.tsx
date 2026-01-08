import styles from "../_style/StudentFeature.module.css";

export default function StudentFeature() {
  return (
    <div>
      <h1 className={styles.text}>Student Feature</h1>
      <div className={styles.container}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📖</div>
          <div>
            <h3 className={styles.textLine1}>Available Quizzes</h3>
            <p className={styles.textLine2}>Browse and take quizzes</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🏆</div>
          <div>
            <h3 className={styles.textLine1}>My Results</h3>
            <p className={styles.textLine2}>View your scores and progress</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📊</div>
          <div>
            <h3 className={styles.textLine1} >Performance</h3>
            <p className={styles.textLine2}>Track your learning progress</p>
          </div>
        </div>
      </div>
    </div>
  );
}
