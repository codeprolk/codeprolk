import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getToken } from "../utils/auth";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

export default function QuizPage() {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState(null);
  const [unavailableReason, setUnavailableReason] = useState(null);

  useEffect(() => {
    fetch(`${BACKEND}/api/quiz/today`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((r) => r.json())
      .then((d) => {
        setQuiz(d.quiz || null);
        setUnavailableReason(
          d.submitted ? "submitted" : d.expired ? "expired" : null,
        );
        setLoading(false);
      });
  }, []);

  const submit = async () => {
    setMessage(null);
    const token = getToken();
    const res = await fetch(`${BACKEND}/api/quiz/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quiz_id: quiz.id, selected_index: selected }),
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.detail || "Error");
      return;
    }
    setQuiz(null);
    setSelected(null);
    setUnavailableReason("submitted");
  };

  if (loading) {
    return (
      <div className="quiz-page quiz-status-page">
        <p className="quiz-status">Loading today&apos;s quiz...</p>
      </div>
    );
  }

  if (unavailableReason === "submitted") {
    return (
      <div className="quiz-page quiz-status-page">
        <span className="quiz-status-mark" aria-hidden="true">
          ✓
        </span>
        <h2>No attempts available</h2>
        <p>You have already submitted today&apos;s quiz.</p>
        <Link className="quiz-status-link" to="/leaderboard">
          View leaderboard
        </Link>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="quiz-page quiz-status-page">
        <span className="quiz-status-mark" aria-hidden="true">
          —
        </span>
        <h2>No quiz available at the moment</h2>
        <p>Please wait</p>
        <Link className="quiz-status-link" to="/leaderboard">
          View leaderboard
        </Link>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h2>Daily Quiz</h2>
      <p>{quiz.question}</p>
      <ul>
        {quiz.options.map((opt, idx) => (
          <li key={idx}>
            <label>
              <input
                type="radio"
                name="opt"
                onChange={() => setSelected(idx)}
              />{" "}
              {opt}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={submit} disabled={selected === null}>
        Submit
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
