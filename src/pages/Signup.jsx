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

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    const exists = users.find((u) => u.email === form.email);

    if (exists) {
      setError("User already exists");
      return;
    }

    const hashedPassword = bcrypt.hashSync(form.password, 10);

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, password: hashedPassword }),
    });

    navigate("/login");
  };

  return (
    <div className="signup-page">
      <h1>👩🏾‍🌾 Register on Smart-Farm Kenya</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input name="name" placeholder="Full name" value={form.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <select name="role" value={form.role} onChange={handleChange}>
          <option value="farmer">Farmer</option>
          <option value="buyer">Buyer</option>
        </select>
        <button type="submit">Sign Up</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
}
