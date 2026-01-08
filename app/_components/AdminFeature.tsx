import styles from "../_style/AdminFeature.module.css";

export default function AdminFeature() {
  return (
    <div>
      <h1 className={styles.text}>Admin Feature</h1>
      <div className={styles.container}>
        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>🕵️</div>
          <div>
            <h3 className={styles.textLine1}>Manage Users</h3>
            <p className={styles.textLine2}>Add, edit, and remove teachers and students</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📊</div>
          <div>
            <h3 className={styles.textLine1}>Analytics</h3>
            <p className={styles.textLine2}>View system-wide statistics and reports</p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIcon}>📝</div>
          <div>
            <h3 className={styles.textLine1} >Manage Content</h3>
            <p className={styles.textLine2}>Oversee all quizzes and categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}
