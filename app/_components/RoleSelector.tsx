"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "../_style/RoleSelector.module.css";
import StudentFeature from "./StudentFeature";
import TeacherFeature from "./TeacherFeature";
import AdminFeature from "./AdminFeature";

export default function RoleSelector() {
  const [role, setRole] = useState("student");
  return (
    <>
      <h2 className={styles.title}>Select Your Roles</h2>

      <div className={styles.container}>
        <div
          className={`${styles.admin} ${role === "admin" && styles.admin2}`}
          onClick={() => setRole("admin")}
        >
          <Image src="/admin.jpg" alt="admin" height={80} width={80} />
          <p>Admin</p>
        </div>

        <div
          className={`${styles.admin} ${role === "teacher" && styles.admin2}`}
          onClick={() => setRole("teacher")}
        >
          <Image src="/teacher.png" alt="Teacher" height={80} width={80} />
          <p>Teacher</p>
        </div>

        <div
          className={`${styles.admin} ${role === "student" && styles.admin2}`}
          onClick={() => setRole("student")}
        >
          <Image src="/student.webp" alt="Student" height={60} width={80} />
          <p>Student</p>
        </div>
      </div>

      <div className={styles.features}>
        {role === "student" && <StudentFeature />}
        {role === "teacher" && <TeacherFeature />}
        {role === "admin" && <AdminFeature />}
      </div>
    </>
  );
}
