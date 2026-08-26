import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

export default function Leaderboard() {
  const [month, setMonth] = useState(currentMonth);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${BACKEND}/api/leaderboard?month=${month}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.detail || "Unable to load leaderboard");
        return data;
      })
      .then((data) => setEntries(data.leaderboard || []))
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [month]);

  return (
    <div className="leaderboard-page">
      <h2>Monthly Leaderboard</h2>
      <label>
        Month
        <input
          type="month"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
        />
      </label>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading &&
        !error &&
        (entries.length ? (
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Correct</th>
                <th>Attempts</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.username}>
                  <td>{entry.rank}</td>
                  <td>{entry.username}</td>
                  <td>{entry.correct}</td>
                  <td>{entry.attempts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No submissions for this month.</p>
        ))}
      <div className="leaderboard-cta">
        <p>Want to join the leaderboard?</p>
        <Link className="leaderboard-cta-link" to="/quiz">
          Take today&apos;s quiz
        </Link>
      </div>
    </div>
  );
}
