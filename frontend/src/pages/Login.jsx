import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Sun, Moon } from "lucide-react";
import Modal from "../components/Modal";
import "../styles/Auth.css";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState(localStorage.getItem("rememberEmail") || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(!!localStorage.getItem("rememberEmail"));
  const [capsLock, setCapsLock] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [toast, setToast] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 6;

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const doLogin = (e) => {
    e.preventDefault();
    if (!emailOk || !passOk) return;

    const userData = { email };
    login(userData); // ✅ Updates AuthContext
    localStorage.setItem("rememberEmail", remember ? email : "");
    setToast("✅ Login successful!");
    setTimeout(() => navigate("/dashboard"), 800);
  };

  return (
    <div className={`auth-page ${darkMode ? "dark-mode" : "light-mode"}`}>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="auth-card"
      >
        {/* Theme Toggle */}
        <button onClick={toggleTheme} className="theme-toggle">
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <h1>Welcome to HMS</h1>
        <p className="subtitle">Login to manage hospital efficiently</p>

        <form onSubmit={doLogin} className="auth-form">
          {/* Email */}
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group password-group">
            <label>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyUp={(e) => setCapsLock(e.getModifierState("CapsLock"))}
              placeholder="••••••••"
              required
            />
            <span
              className="show-pass-btn"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
            {capsLock && <p className="caps-warning">⚠ Caps Lock is ON</p>}
          </div>

          {/* Remember me */}
          <div className="remember-group">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          {/* Login button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>

          {/* Google Login */}
          <motion.button
            type="button"
            className="google-login"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => alert("Google Login")}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="google-icon"
            />
            Login with Google
          </motion.button>

          {/* Links */}
          <div className="auth-links">
            <button type="button" onClick={() => setShowRegister(true)}>
              Create Account
            </button>
            <button type="button" onClick={() => setForgotOpen(true)}>
              Forgot Password?
            </button>
          </div>
        </form>
      </motion.div>

      {/* Register Modal */}
      <Modal
        open={showRegister}
        onClose={() => setShowRegister(false)}
        title="Create Account"
      >
        <RegisterForm closeModal={() => setShowRegister(false)} />
      </Modal>

      {/* Forgot Password Modal */}
      <Modal
        open={forgotOpen}
        onClose={() => setForgotOpen(false)}
        title="Reset Password"
      >
        <ForgotForm closeModal={() => setForgotOpen(false)} setToast={setToast} />
      </Modal>
    </div>
  );
}

// ===== Register Form =====
function RegisterForm({ closeModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const passOk = password.length >= 6 && password === confirm;

  const doRegister = (e) => {
    e.preventDefault();
    if (!emailOk || !passOk) return;
    alert("Account Created!");
    closeModal();
  };

  return (
    <form onSubmit={doRegister} className="auth-form">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />
      <button type="submit" disabled={!emailOk || !passOk}>
        Create Account
      </button>
      <button type="button" className="back-btn" onClick={closeModal}>
        Back
      </button>
    </form>
  );
}

// ===== Forgot Password Form =====
function ForgotForm({ closeModal, setToast }) {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setToast("📧 Reset link sent!");
        closeModal();
      }}
      className="auth-form"
    >
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Send Reset Link</button>
      <button type="button" className="back-btn" onClick={closeModal}>
        Back
      </button>
    </form>
  );
}
