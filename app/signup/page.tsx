"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/_style/signin-page/signinPage.module.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CryptoJS from "crypto-js";

const SECRET_KEY = "quiz-app-secret-key";

function encryptPassword(password: string): string {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
}

type Role = "admin" | "teacher" | "student";

interface User {
  name: string;
  email: string;
  password: string;
  role: Role;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

export default function Page() {
  const router = useRouter();

  const [formData, setFormData] = useState<User>({
    name: "",
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [showPassword, setShowPassword] = useState(false);

  /* Regex */
  const nameRegex = /^[A-Za-z ]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

  function getUsers(): User[] {
    const stored = localStorage.getItem("users");
    return stored ? JSON.parse(stored) : [];
  }

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error on change
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  function validate(): boolean {
    const newErrors: Errors = {};

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name should contain only letters";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!passwordRegex.test(formData.password)) {
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

  const exists = users.some((user) => user.email === formData.email);

  if (exists) {
    setErrors({
      email: "User already exists. Please login.",
    });
    return;
  }

  const encryptedUser: User = {
    ...formData,
    password: encryptPassword(formData.password),
  };

  users.push(encryptedUser);
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(encryptedUser));

  router.push(`/${formData.role}`);
}


  function handleLogin() {
    router.push("/login");
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>Sign up</h2>

        {/* Role */}
        <div className={styles.field}>
          <label className={styles.label}>
            Select Role <span>*</span>
          </label>
          <select
            name="role"
            value={formData.role}
            className={styles.select}
            onChange={handleChange}
            required
          >
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="student">Student</option>
          </select>
        </div>

        {/* Name */}
        <div className={styles.field}>
          <label className={styles.label}>
            Name <span>*</span>
          </label>
          <input
            type="text"
            name="name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        {/* Email */}
        <div className={styles.field}>
          <label className={styles.label}>
            Email <span>*</span>
          </label>
          <input
            type="email"
            name="email"
            className={styles.input}
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>

        {/* Password */}
        {/* Password */}
        <div className={styles.field}>
          <label className={styles.label}>
            Password <span>*</span>
          </label>

          {/* Input + Eye wrapper */}
          <div className={styles.passwordWrapper}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className={styles.input}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((p) => !p)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.password && <p className={styles.error}>{errors.password}</p>}
        </div>

        <button className={styles.button} type="submit">
          Sign Up
        </button>

        <h2 className={styles.heading}>
          Already a user?{" "}
          <span className={styles.loginText} onClick={handleLogin}>
            Login
          </span>
        </h2>
      </form>
    </div>
  );
}
