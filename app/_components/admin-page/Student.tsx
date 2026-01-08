"Use Client"

import styles from "@/app/_style/admin-page-style/Student.module.css"

export default function Student() {
    return (
        <div className={styles.container}>
            <h3 className={styles.text}>Active Student</h3>
            <p className={styles.number}>5</p>
        </div>
    )
}