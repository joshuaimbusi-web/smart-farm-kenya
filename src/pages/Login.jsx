import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser, remember, setRemember } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/users");
      const users = await res.json();
      const foundUser = users.find((u) => u.email === form.email);

      if (foundUser && bcrypt.compareSync(form.password, foundUser.password)) {
        setUser(foundUser);
        navigate(foundUser.role === "buyer" ? "/farm-products" : "/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("⚠️ Server error. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome back 👋</h1>
          <p className="muted">Login to access your dashboard and manage your farm.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <div className="remember-row">
            <label className="remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <NavLink to="/forgot-password" className="forgot-link">Forgot?</NavLink>
          </div>

          <button type="submit" className="primary btn btn-primary">Login</button>
          {error && <p className="error">{error}</p>}
        </form>

        <p className="signup-cta">
          Don’t have an account? <NavLink to="/signup">Sign up here</NavLink>
        </p>
      </div>
    </div>
  );
}

