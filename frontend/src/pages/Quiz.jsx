import React, { useEffect, useState } from "react";
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
    setMessage(data.is_correct ? "Correct!" : "Incorrect");
  };

  if (loading) return <p>Loading...</p>;
  if (unavailableReason === "submitted") return <p>No attempts available</p>;
  if (!quiz) return <p>No quiz available today or it has expired.</p>;

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
