"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/_style/signin-page/signinPage.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CryptoJS from "crypto-js";

const SECRET_KEY = "quiz-app-secret-key";

function decryptPassword(encrypted: string): string {
  const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
}

type Role = "admin" | "teacher" | "student";

interface User {
  email: string;
  password: string;
  role: Role;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function Page() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  /* Regex */
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  function getUsers(): User[] {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  }

  function validate(): boolean {
    const newErrors: Errors = {};

    if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!passwordRegex.test(password)) {
      newErrors.password =
        "Password must be 8+ chars, include uppercase, lowercase, number & special character";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
  e.preventDefault();

  if (!validate()) return;

  const users = getUsers();

  const user = users.find((u) => {
    if (u.email !== email) return false;

    const decryptedPassword = decryptPassword(u.password);
    return decryptedPassword === password;
  });

  if (!user) {
    setErrors({
      password: "Invalid email or password",
    });
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  router.push(`/${user.role}`);
}


  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Welcome Back</h2>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label}>
            Email <span>*</span>
          </label>
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setEmail(e.target.value);
              setErrors((prev) => ({ ...prev, email: "" }));
            }}
            required
          />
          {errors.email && (
            <p className={styles.error}>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className={styles.field}>
          <label className={styles.label}>
            Password <span>*</span>
          </label>

          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={password}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: "" }));
              }}
              required
            />

            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && (
            <p className={styles.error}>{errors.password}</p>
          )}
        </div>

        <button className={styles.button} type="submit">
          Login
        </button>

        <p className={styles.heading}>
          New User?{" "}
          <span
            className={styles.loginText}
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
