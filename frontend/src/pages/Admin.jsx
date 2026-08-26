import React, { useState, useEffect } from "react";
import { getToken } from "../utils/auth";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toDateTimeInputValue(date) {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  return localDate.toISOString().slice(0, 16);
}

export default function AdminPage() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [date, setDate] = useState(() => toDateInputValue(new Date()));
  const [expiry, setExpiry] = useState(() =>
    toDateTimeInputValue(new Date(Date.now() + 24 * 60 * 60 * 1000)),
  );
  const [message, setMessage] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const token = getToken();
    const payload = {
      question,
      options,
      correct_index: Number(correct),
      date,
      expiry,
    };
    const res = await fetch(`${BACKEND}/api/admin/quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      const detail = Array.isArray(data.detail)
        ? data.detail.map((item) => item.msg || JSON.stringify(item)).join("; ")
        : data.detail && typeof data.detail === "object"
          ? data.detail.msg || JSON.stringify(data.detail)
          : data.detail;
      setMessage(String(detail || "Error creating quiz"));
      return;
    }
    setMessage("Quiz created");
  };

  return (
    <div className="admin-page">
      <h2>Admin Dashboard</h2>
      <form onSubmit={submit}>
        <label>Question</label>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        {options.map((o, i) => (
          <div key={i}>
            <label>Option {i + 1}</label>
            <input
              value={o}
              onChange={(e) => {
                const copy = [...options];
                copy[i] = e.target.value;
                setOptions(copy);
              }}
            />
          </div>
        ))}
        <label>Correct Option (0-3)</label>
        <input value={correct} onChange={(e) => setCorrect(e.target.value)} />
        <label>Date (YYYY-MM-DD)</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label>Expiry (ISO datetime)</label>
        <input
          type="datetime-local"
          value={expiry}
          onChange={(e) => setExpiry(e.target.value)}
        />
        <button type="submit">Create Quiz</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
