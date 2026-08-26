import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    const res = await fetch(`${BACKEND}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      const detail = Array.isArray(data.detail)
        ? data.detail.map((item) => item.msg || JSON.stringify(item)).join("; ")
        : data.detail && typeof data.detail === "object"
          ? data.detail.msg || JSON.stringify(data.detail)
          : data.detail;
      setError(String(detail || "Registration failed"));
      return;
    }
    navigate("/login");
  };

  return (
    <div className="auth-page">
      <h2>Register</h2>
      <form onSubmit={submit}>
        <label>Username</label>
        <input
          value={username}
          minLength={3}
          maxLength={50}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          minLength={8}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}
