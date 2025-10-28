import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "farmer",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      setError("❌ User already exists");
      return;
    }
    const hashedPassword = bcrypt.hashSync(form.password, 10);
    const newUser = { ...form, password: hashedPassword };

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    alert("✅ Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>👩🏾‍🌾 Join Smart-Farm Kenya</h1>
        <p className="subtitle">
          Empower your farming journey — create your account today!
        </p>

        <form onSubmit={handleSubmit} className="signup-form">
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
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
          <select name="role" value={form.role} onChange={handleChange}>
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="signup-btn btn btn-primary">
            Create Account
          </button>
        </form>

        <p className="login-redirect">
          Already have an account? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}

