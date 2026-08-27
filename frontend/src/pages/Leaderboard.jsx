import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// const BACKEND = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

function currentMonth() {
  return new Date().toISOString().slice(0, 7);
}

export default function Leaderboard() {
  const [month, setMonth] = useState(currentMonth);
  const [page, setPage] = useState(1);
  const [entries, setEntries] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/api/leaderboard?month=${month}&page=${page}")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.detail || "Unable to load leaderboard");
        return data;
      })
      .then((data) => {
        setEntries(data.leaderboard || []);
        setTotalPages(data.total_pages || 1);
      })
      .catch((requestError) => setError(requestError.message))
      .finally(() => setLoading(false));
  }, [month, page]);

  const changeMonth = (event) => {
    setMonth(event.target.value);
    setPage(1);
  };

  return (
    <div className="leaderboard-page">
      <h2>Monthly Leaderboard</h2>
      <label>
        Month
        <input type="month" value={month} onChange={changeMonth} />
      </label>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading &&
        !error &&
        (entries.length ? (
          <>
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
                  <tr key={entry.username} className={`rank-${entry.rank}`}>
                    <td>
                      <span className="rank-badge">{entry.rank}</span>
                    </td>
                    <td className="rank-username">{entry.username}</td>
                    <td>{entry.correct}</td>
                    <td>{entry.attempts}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav
              className="leaderboard-pagination"
              aria-label="Leaderboard pages"
            >
              <button
                type="button"
                onClick={() => setPage((current) => current - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    type="button"
                    className={pageNumber === page ? "active" : ""}
                    aria-current={pageNumber === page ? "page" : undefined}
                    onClick={() => setPage(pageNumber)}
                    key={pageNumber}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
              <button
                type="button"
                onClick={() => setPage((current) => current + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </nav>
          </>
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
