import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setUser, remember, setRemember } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/users");
    const users = await res.json();
    const foundUser = users.find((u) => u.email === form.email);

    if (foundUser && bcrypt.compareSync(form.password, foundUser.password)) {
      setUser(foundUser);
      navigate(foundUser.role === "buyer" ? "/farm-products" : "/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-page">
      <h1>🌾 Smart-Farm Kenya Login</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <div className="remember">
          <input type="checkbox" checked={remember} onChange={() => setRemember(!remember)} />
          <label>Remember me</label>
        </div>
        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
      <p>Don’t have an account? <a href="/signup">Sign up here</a></p>
    </div>
  );
}
