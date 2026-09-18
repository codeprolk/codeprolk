import React, { useEffect, useMemo, useState } from "react";
import { getToken, getTokenPayload } from "../utils/auth";

function toDateInputValue(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readableDate(dateString) {
  if (!dateString) return "";
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function emptyBugHuntRound(index) {
  return {
    title: `Round ${index + 1}`,
    code_text: "",
    buggy_line: 0,
    diagnoses: ["", "", ""],
    correct_diagnosis: 0,
    fixes: ["", "", ""],
    correct_fix: 0,
    explanation: "",
  };
}

function emptyBugHuntRounds() {
  return Array.from({ length: 3 }, (_, index) => emptyBugHuntRound(index));
}

function resizeChoices(choices, size) {
  return Array.from({ length: size }, (_, index) => choices[index] || "");
}

function MonthlyInsights({ days, month, onMonthChange }) {
  const [activeDayIndex, setActiveDayIndex] = useState(null);
  const width = 920;
  const height = 330;
  const padding = { top: 28, right: 28, bottom: 48, left: 48 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxValue = Math.max(1, ...days.flatMap((day) => [day.attempts, day.correct]));
  const roundedMax = Math.max(5, Math.ceil(maxValue / 5) * 5);
  const x = (index) => padding.left + (days.length <= 1 ? 0 : (index / (days.length - 1)) * chartWidth);
  const y = (value) => padding.top + chartHeight - (value / roundedMax) * chartHeight;
  const points = (key) => days.map((day, index) => `${x(index)},${y(day[key])}`).join(" ");
  const totalAttempts = days.reduce((sum, day) => sum + day.attempts, 0);
  const totalCorrect = days.reduce((sum, day) => sum + day.correct, 0);
  const accuracy = totalAttempts ? Math.round((totalCorrect / totalAttempts) * 100) : 0;
  const monthLabel = new Date(`${month}-01T00:00:00`).toLocaleDateString(undefined, {
    month: "long",
    year: "numeric",
  });
  const gridValues = Array.from({ length: 5 }, (_, index) => Math.round((roundedMax / 4) * index));
  const activeDay = activeDayIndex === null ? null : days[activeDayIndex];
  const tooltipWidth = 196;
  const tooltipHeight = 116;
  const tooltipX = activeDayIndex === null
    ? 0
    : Math.min(width - padding.right - tooltipWidth, Math.max(padding.left, x(activeDayIndex) - tooltipWidth / 2));
  const tooltipY = activeDayIndex === null
    ? 0
    : Math.max(8, Math.min(y(activeDay.attempts), y(activeDay.correct)) - tooltipHeight - 16);

  return (
    <div className="admin-insights">
      <header className="admin-insights-header">
        <div>
          <p className="admin-insights-kicker">QUIZ PERFORMANCE</p>
          <h3>Monthly Insights</h3>
          <p>Daily participation and correct answers for {monthLabel}.</p>
        </div>
        <label className="admin-month-control">
          <span>Reporting month</span>
          <input type="month" value={month} onChange={(event) => onMonthChange(event.target.value)} />
        </label>
      </header>

      <div className="admin-insights-summary" aria-label={`${monthLabel} summary`}>
        <div><span>Participants</span><strong>{totalAttempts}</strong></div>
        <div><span>Correct answers</span><strong>{totalCorrect}</strong></div>
        <div><span>Accuracy</span><strong>{accuracy}%</strong></div>
      </div>

      <div className="admin-chart-shell">
        <div className="admin-chart-legend" aria-hidden="true">
          <span><i className="attempts" />Quiz attempts</span>
          <span><i className="correct" />Correct answers</span>
        </div>

        <div className="admin-chart-scroll">
          <svg
            className="admin-insights-chart"
            viewBox={`0 0 ${width} ${height}`}
            role="img"
            aria-label={`Quiz attempts and correct answers for ${monthLabel}`}
            onMouseLeave={() => setActiveDayIndex(null)}
          >
            {gridValues.map((value) => (
              <g key={value}>
                <line x1={padding.left} x2={width - padding.right} y1={y(value)} y2={y(value)} className="admin-chart-gridline" />
                <text x={padding.left - 12} y={y(value) + 4} textAnchor="end" className="admin-chart-axis-label">{value}</text>
              </g>
            ))}

            {days.map((day, index) => {
              const showLabel = index === 0 || index === days.length - 1 || (index + 1) % 5 === 0;
              return showLabel ? (
                <text key={day.date} x={x(index)} y={height - 16} textAnchor="middle" className="admin-chart-axis-label">
                  {day.date.slice(8)}
                </text>
              ) : null;
            })}

            <polyline points={points("attempts")} className="admin-chart-line attempts" />
            <polyline points={points("correct")} className="admin-chart-line correct" />

            {days.map((day, index) => (
              <g key={day.date}>
                <rect
                  x={x(index) - Math.max(8, chartWidth / Math.max(days.length - 1, 1) / 2)}
                  y={padding.top}
                  width={Math.max(16, chartWidth / Math.max(days.length - 1, 1))}
                  height={chartHeight}
                  className="admin-chart-day-target"
                  tabIndex="0"
                  role="button"
                  aria-label={`${readableDate(day.date)}: ${day.attempts} attempts, ${day.correct} correct, ${Math.max(0, day.attempts - day.correct)} incorrect`}
                  onMouseEnter={() => setActiveDayIndex(index)}
                  onFocus={() => setActiveDayIndex(index)}
                  onClick={() => setActiveDayIndex(index)}
                />
                <circle cx={x(index)} cy={y(day.attempts)} r="5" className={`admin-chart-point attempts ${activeDayIndex === index ? "active" : ""}`} />
                <circle cx={x(index)} cy={y(day.correct)} r="5" className={`admin-chart-point correct ${activeDayIndex === index ? "active" : ""}`} />
              </g>
            ))}

            {activeDay && (
              <g className="admin-chart-tooltip" aria-hidden="true" pointerEvents="none">
                <line
                  x1={x(activeDayIndex)}
                  x2={x(activeDayIndex)}
                  y1={padding.top}
                  y2={padding.top + chartHeight}
                  className="admin-chart-guide"
                />
                <rect x={tooltipX} y={tooltipY} width={tooltipWidth} height={tooltipHeight} rx="5" className="admin-chart-tooltip-box" />
                <text x={tooltipX + 16} y={tooltipY + 24} className="admin-chart-tooltip-date">
                  {readableDate(activeDay.date)}
                </text>
                <circle cx={tooltipX + 18} cy={tooltipY + 49} r="4" className="admin-chart-tooltip-dot attempts" />
                <text x={tooltipX + 30} y={tooltipY + 53} className="admin-chart-tooltip-label">Quiz attempts</text>
                <text x={tooltipX + tooltipWidth - 16} y={tooltipY + 53} textAnchor="end" className="admin-chart-tooltip-value">{activeDay.attempts}</text>
                <circle cx={tooltipX + 18} cy={tooltipY + 75} r="4" className="admin-chart-tooltip-dot correct" />
                <text x={tooltipX + 30} y={tooltipY + 79} className="admin-chart-tooltip-label">Correct</text>
                <text x={tooltipX + tooltipWidth - 16} y={tooltipY + 79} textAnchor="end" className="admin-chart-tooltip-value">{activeDay.correct}</text>
                <circle cx={tooltipX + 18} cy={tooltipY + 101} r="4" className="admin-chart-tooltip-dot incorrect" />
                <text x={tooltipX + 30} y={tooltipY + 105} className="admin-chart-tooltip-label">Incorrect</text>
                <text x={tooltipX + tooltipWidth - 16} y={tooltipY + 105} textAnchor="end" className="admin-chart-tooltip-value">{Math.max(0, activeDay.attempts - activeDay.correct)}</text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const today = useMemo(() => toDateInputValue(new Date()), []);
  const [editingQuizId, setEditingQuizId] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState("");
  const [userPage, setUserPage] = useState(1);
  const [stats, setStats] = useState([]);
  const [statsMonth, setStatsMonth] = useState(today.slice(0, 7));
  const [question, setQuestion] = useState("");
  const [quizType, setQuizType] = useState("multiple_choice");
  const [wordSearchItems, setWordSearchItems] = useState(Array.from({ length: 5 }, () => ({ word: "", clue: "" })));
  const [bugHuntRounds, setBugHuntRounds] = useState(emptyBugHuntRounds);
  const [activeBugHuntRound, setActiveBugHuntRound] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(180);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [date, setDate] = useState(today);
  const [message, setMessage] = useState(null);
  const [savingQuiz, setSavingQuiz] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingDeleteQuizId, setPendingDeleteQuizId] = useState(null);
  const [deletingQuizId, setDeletingQuizId] = useState(null);

  const longestWordLength = Math.max(0, ...wordSearchItems.map((item) => item.word.length));
  const totalWordLetters = wordSearchItems.reduce((total, item) => total + item.word.length, 0);
  const automaticGridSize = Math.max(
    10,
    Math.min(20, Math.max(longestWordLength, Math.ceil(Math.sqrt(totalWordLetters * 3)))),
  );

  const setBugHuntRoundCount = (count) => {
    setBugHuntRounds((current) => Array.from(
      { length: count },
      (_, index) => current[index] || emptyBugHuntRound(index),
    ));
    setActiveBugHuntRound((current) => Math.min(current, count - 1));
  };

  const token = getToken();
  const headers = { Authorization: `Bearer ${token}` };
  const currentAdminEmail = getTokenPayload(token)?.sub;
  const isPrimaryAdmin = currentAdminEmail === "codeprolkyt@gmail.com";

  const loadAdminData = async () => {
    try {
      const [quizResponse, userResponse, statsResponse] = await Promise.all([
        fetch("/api/admin/quizzes", { headers, cache: "no-store" }),
        fetch("/api/admin/users", { headers, cache: "no-store" }),
        fetch(`/api/admin/stats?month=${statsMonth}`, { headers, cache: "no-store" }),
      ]);

      const [quizData, userData, statsData] = await Promise.all([
        quizResponse.json(),
        userResponse.json(),
        statsResponse.json(),
      ]);

      if (!quizResponse.ok) throw new Error(quizData.detail || "Unable to load quizzes.");
      if (!userResponse.ok) throw new Error(userData.detail || "Unable to load users.");
      if (!statsResponse.ok) throw new Error(statsData.detail || "Unable to load statistics.");

      setQuizzes(quizData.quizzes || []);
      setUsers(userData.users || []);
      setStats(statsData.days || []);
    } catch (error) {
      setMessage(error.message || "Unable to load the admin dashboard.");
    } finally {
      setLoading(false);
    }
  };

  const changeStatsMonth = async (month) => {
    if (!month) return;
    setStatsMonth(month);

    try {
      const response = await fetch(`/api/admin/stats?month=${month}`, {
        headers,
        cache: "no-store",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Unable to load statistics.");
      setStats(data.days || []);
    } catch (error) {
      setMessage(error.message || "Unable to load statistics.");
    }
  };

  useEffect(() => {
    loadAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resetQuizForm = () => {
    setEditingQuizId(null);
    setQuestion("");
    setQuizType("multiple_choice");
    setWordSearchItems(Array.from({ length: 5 }, () => ({ word: "", clue: "" })));
    setBugHuntRounds(emptyBugHuntRounds());
    setActiveBugHuntRound(0);
    setDurationSeconds(180);
    setOptions(["", "", "", ""]);
    setCorrect(0);
    setExplanation("");
    setDate(today);
  };

  const editQuiz = (quiz) => {
    if (quiz.status === "completed") {
      setMessage("Completed quizzes are kept as historical records and cannot be edited.");
      return;
    }

    setEditingQuizId(quiz.id);
    setQuestion(quiz.question);
    setQuizType(quiz.quiz_type || "multiple_choice");
    setWordSearchItems(quiz.word_search_items?.length ? quiz.word_search_items : Array.from({ length: 5 }, () => ({ word: "", clue: "" })));
    setBugHuntRounds(quiz.bug_hunt_rounds?.length ? quiz.bug_hunt_rounds.map((round, index) => ({
      ...emptyBugHuntRound(index),
      ...round,
      code_text: (round.code_lines || []).join("\n"),
    })) : emptyBugHuntRounds());
    setActiveBugHuntRound(0);
    setDurationSeconds(quiz.duration_seconds || 180);
    setOptions(Array.isArray(quiz.options) ? [...quiz.options] : ["", "", "", ""]);
    setCorrect(quiz.correct_index ?? 0);
    setExplanation(quiz.explanation || "");
    setDate(quiz.date);
    setMessage(`Editing quiz scheduled for ${readableDate(quiz.date)}.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    resetQuizForm();
    setMessage(null);
  };

  const deleteQuiz = async (quiz) => {
    if (quiz.status === "completed") return;

    setDeletingQuizId(quiz.id);
    setMessage(null);

    try {
      const response = await fetch(`/api/admin/quiz/${quiz.id}?force=true`, {
        method: "DELETE",
        headers,
      });

      const data = await response.json().catch(() => null);

      if (!response.ok && response.status !== 404) {
        throw new Error(data?.detail || "Unable to delete quiz.");
      }

      if (editingQuizId === quiz.id) resetQuizForm();
      setQuizzes((current) => current.filter((item) => item.id !== quiz.id));
      setPendingDeleteQuizId(null);
      setMessage(response.status === 404 ? "Quiz was already deleted. The list has been refreshed." : "Quiz deleted successfully.");
      await loadAdminData();
    } catch (error) {
      setMessage(error.message || "Unable to delete quiz.");
    } finally {
      setDeletingQuizId(null);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    if (savingQuiz) return;

    setMessage(null);
    const cleanedQuestion = question.trim();
    const cleanedOptions = options.map((option) => option.trim());

    if (!cleanedQuestion) {
      setMessage("Please enter a question.");
      return;
    }

    if (quizType === "multiple_choice" && cleanedOptions.some((option) => !option)) {
      setMessage("Please complete all four answer options.");
      return;
    }

    if (quizType === "word_search" && wordSearchItems.some((item) => !item.word.trim() || !item.clue.trim())) {
      setMessage(`Please complete all ${wordSearchItems.length} words and clues.`);
      return;
    }

    const incompleteBugHuntRound = quizType === "bug_hunt" ? bugHuntRounds.findIndex((round) => {
      const lines = round.code_text.split("\n").filter((line) => line.trim());
      return lines.length < 3 || round.diagnoses.some((item) => !item.trim()) || round.fixes.some((item) => !item.trim());
    }) : -1;

    if (incompleteBugHuntRound !== -1) {
      setActiveBugHuntRound(incompleteBugHuntRound);
      setMessage(`Complete Round ${incompleteBugHuntRound + 1}, including code and every diagnosis and repair choice.`);
      return;
    }

    if (date < today) {
      setMessage("You cannot schedule a quiz for a past date.");
      return;
    }

    setSavingQuiz(true);

    try {
      const payload = {
        quiz_type: quizType,
        question: cleanedQuestion,
        options: quizType === "multiple_choice" ? cleanedOptions : [],
        correct_index: Number(correct),
        explanation: explanation.trim(),
        date,
        word_search_items: quizType === "word_search" ? wordSearchItems : null,
        bug_hunt_rounds: quizType === "bug_hunt" ? bugHuntRounds.map((round) => ({
          ...round,
          code_lines: round.code_text.split("\n").filter((line) => line.trim()),
          code_text: undefined,
        })) : null,
        duration_seconds: Number(durationSeconds),
      };

      const response = await fetch(
        `/api/admin/quiz${editingQuizId ? `/${editingQuizId}` : ""}`,
        {
          method: editingQuizId ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        let detail = data?.detail;
        if (Array.isArray(detail)) {
          detail = detail.map((item) => item.msg || JSON.stringify(item)).join("; ");
        }
        throw new Error(typeof detail === "string" ? detail : "Unable to save quiz.");
      }

      const wasEditing = editingQuizId !== null;
      const savedDate = date;
      resetQuizForm();

      setMessage(
        wasEditing
          ? "Quiz updated successfully."
          : `Quiz scheduled for ${readableDate(savedDate)}.`,
      );

      await loadAdminData();
    } catch (error) {
      setMessage(error.message || "Unable to save quiz.");
    } finally {
      setSavingQuiz(false);
    }
  };

  const searchUsers = async (event) => {
    const value = event.target.value;
    setUserSearch(value);
    setUserPage(1);

    try {
      const response = await fetch(
        `/api/admin/users?search=${encodeURIComponent(value)}`,
        { headers, cache: "no-store" },
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Unable to search users.");
      setUsers(data.users || []);
    } catch (error) {
      setMessage(error.message);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm("Remove this user?")) return;

    try {
      const response = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
        headers,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Unable to remove user.");
      setMessage("User removed.");
      await loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const makeAdmin = async (userId) => {
    try {
      const response = await fetch(`/api/admin/users/${userId}/make-admin`, {
        method: "POST",
        headers,
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Unable to grant admin access.");
      setMessage("User is now an admin.");
      await loadAdminData();
    } catch (error) {
      setMessage(error.message);
    }
  };

  const todayQuizzes = quizzes.filter((quiz) => quiz.status === "today");
  const scheduledQuizzes = quizzes
    .filter((quiz) => quiz.status === "scheduled")
    .slice()
    .sort((a, b) => a.date.localeCompare(b.date));

  const quizActions = (quiz) => (
    <span className="admin-row-actions">
      {pendingDeleteQuizId === quiz.id ? (
        <span className="admin-delete-confirm" role="group" aria-label={`Confirm deletion of quiz scheduled for ${quiz.date}`}>
          <span>Delete permanently?</span>
          <button type="button" className="admin-delete-confirm-button" onClick={() => deleteQuiz(quiz)} disabled={deletingQuizId === quiz.id}>
            {deletingQuizId === quiz.id ? "Deleting..." : "Confirm"}
          </button>
          <button type="button" onClick={() => setPendingDeleteQuizId(null)} disabled={deletingQuizId === quiz.id}>
            Cancel
          </button>
        </span>
      ) : (
        <>
          <button type="button" onClick={() => editQuiz(quiz)}>
            Edit
          </button>
          <button type="button" onClick={() => setPendingDeleteQuizId(quiz.id)}>
            Delete
          </button>
        </>
      )}
    </span>
  );

  return (
    <div className="admin-page">
      <div className="admin-hero">
        <p className="admin-kicker">CODEPRO LK / CONTROL ROOM</p>
        <h2>Admin Dashboard</h2>
        <p>Schedule quizzes, manage members, publish the latest post, and watch the current month’s quiz performance.</p>
      </div>

      <section className="admin-section">
        <h3>{editingQuizId ? "Edit Quiz" : "Schedule a Quiz"}</h3>

        <form onSubmit={submit}>
          <label htmlFor="quiz-date">Quiz Date</label>
          <input
            id="quiz-date"
            type="date"
            value={date}
            min={today}
            required
            onChange={(event) => setDate(event.target.value)}
          />
          <small>
            Choose today or any future date. The quiz will be available on that date automatically.
          </small>

          <label htmlFor="quiz-type">Quiz Format</label>
          <select id="quiz-type" value={quizType} onChange={(event) => setQuizType(event.target.value)}>
            <option value="multiple_choice">Multiple choice</option>
            <option value="word_search">Word search challenge</option>
            <option value="bug_hunt">Bug Hunt challenge</option>
          </select>
          <small>Most days can remain multiple choice. Use Word Search or Bug Hunt for special challenge days.</small>

          <label htmlFor="quiz-question">Question</label>
          <textarea
            id="quiz-question"
            value={question}
            required
            onChange={(event) => setQuestion(event.target.value)}
          />

          {quizType === "multiple_choice" && options.map((option, index) => (
            <div key={index}>
              <label htmlFor={`quiz-option-${index}`}>Option {index + 1}</label>
              <input
                id={`quiz-option-${index}`}
                value={option}
                required
                onChange={(event) => {
                  const copy = [...options];
                  copy[index] = event.target.value;
                  setOptions(copy);
                }}
              />
            </div>
          ))}

          {quizType === "multiple_choice" && <><label htmlFor="correct-option">Correct Option</label>
          <select
            id="correct-option"
            value={correct}
            onChange={(event) => setCorrect(Number(event.target.value))}
          >
            {options.map((option, index) => (
              <option value={index} key={index}>
                Option {index + 1}: {option || "Empty"}
              </option>
            ))}
          </select></>}

          {quizType === "word_search" && (
            <fieldset className="admin-word-search-fields">
              <legend>Hidden words and clues</legend>
              <label htmlFor="word-search-count">Number of hidden words</label>
              <select
                id="word-search-count"
                value={wordSearchItems.length}
                onChange={(event) => {
                  const count = Number(event.target.value);
                  setWordSearchItems((current) => Array.from(
                    { length: count },
                    (_, index) => current[index] || { word: "", clue: "" },
                  ));
                }}
              >
                {Array.from({ length: 8 }, (_, index) => index + 3).map((count) => (
                  <option value={count} key={count}>{count} words</option>
                ))}
              </select>
              <p className="admin-word-search-grid-note">
                Automatic grid: <strong>{automaticGridSize} × {automaticGridSize}</strong>
                <span> Adjusts to word length and puzzle density.</span>
              </p>
              {wordSearchItems.map((item, index) => (
                <div className="admin-word-search-row" key={index}>
                  <label htmlFor={`word-search-word-${index}`}>Word {index + 1}</label>
                  <input id={`word-search-word-${index}`} value={item.word} maxLength={15} placeholder="e.g. XGBOOST" onChange={(event) => setWordSearchItems((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, word: event.target.value.toUpperCase().replace(/[^A-Z]/g, "") } : entry))} />
                  <label htmlFor={`word-search-clue-${index}`}>Clue {index + 1}</label>
                  <input id={`word-search-clue-${index}`} value={item.clue} maxLength={180} placeholder="A clue shown only when this word is active" onChange={(event) => setWordSearchItems((current) => current.map((entry, itemIndex) => itemIndex === index ? { ...entry, clue: event.target.value } : entry))} />
                </div>
              ))}
              <label htmlFor="word-search-duration">Time limit</label>
              <select id="word-search-duration" value={durationSeconds} onChange={(event) => setDurationSeconds(Number(event.target.value))}>
                <option value={120}>2 minutes</option>
                <option value={180}>3 minutes</option>
                <option value={300}>5 minutes</option>
              </select>
            </fieldset>
          )}

          {quizType === "bug_hunt" && (
            <fieldset className="admin-bug-hunt-fields">
              <legend>Bug Hunt rounds</legend>
              <p className="admin-word-search-grid-note">Players earn one point for the faulty line, one for the diagnosis, and one for the repair in every round.</p>
              <div className="admin-bug-config-row">
                <label htmlFor="bug-hunt-round-count">Number of rounds</label>
                <select id="bug-hunt-round-count" value={bugHuntRounds.length} onChange={(event) => setBugHuntRoundCount(Number(event.target.value))}>
                  {[1, 2, 3, 4, 5].map((count) => <option value={count} key={count}>{count} round{count === 1 ? "" : "s"}</option>)}
                </select>
              </div>
              <div className="admin-bug-round-selector" role="tablist" aria-label="Select a Bug Hunt round">
                {bugHuntRounds.map((round, roundIndex) => {
                  const complete = round.code_text.split("\n").filter((line) => line.trim()).length >= 3
                    && round.diagnoses.every((item) => item.trim())
                    && round.fixes.every((item) => item.trim());
                  return (
                    <button
                      type="button"
                      role="tab"
                      aria-selected={activeBugHuntRound === roundIndex}
                      className={activeBugHuntRound === roundIndex ? "is-active" : ""}
                      onClick={() => setActiveBugHuntRound(roundIndex)}
                      key={roundIndex}
                    >
                      <span>Round {roundIndex + 1}</span>
                      <small>{complete ? "Ready" : "Needs details"}</small>
                    </button>
                  );
                })}
              </div>
              {bugHuntRounds.map((round, roundIndex) => {
                if (roundIndex !== activeBugHuntRound) return null;
                const codeLineCount = Math.max(1, round.code_text.split("\n").filter((line) => line.trim()).length);
                const updateRound = (changes) => setBugHuntRounds((current) => current.map((item, index) => index === roundIndex ? { ...item, ...changes } : item));
                return (
                  <section className="admin-bug-hunt-round" role="tabpanel" key={roundIndex}>
                    <header className="admin-bug-round-heading">
                      <div>
                        <span>ROUND {roundIndex + 1} OF {bugHuntRounds.length}</span>
                        <h4>{round.title || `Round ${roundIndex + 1}`}</h4>
                      </div>
                      <strong>{roundIndex + 1}/{bugHuntRounds.length}</strong>
                    </header>
                    <label htmlFor={`bug-title-${roundIndex}`}>Round title</label>
                    <input id={`bug-title-${roundIndex}`} value={round.title} maxLength={100} onChange={(event) => updateRound({ title: event.target.value })} />
                    <label htmlFor={`bug-code-${roundIndex}`}>Code scene</label>
                    <textarea id={`bug-code-${roundIndex}`} className="admin-bug-code" rows={7} value={round.code_text} placeholder={"model.fit(training_data)\ntest_data = training_data\naccuracy = model.score(test_data)"} onChange={(event) => updateRound({ code_text: event.target.value, buggy_line: Math.min(round.buggy_line, Math.max(0, event.target.value.split("\n").filter((line) => line.trim()).length - 1)) })} />
                    <label htmlFor={`bug-line-${roundIndex}`}>Faulty line</label>
                    <select id={`bug-line-${roundIndex}`} value={round.buggy_line} onChange={(event) => updateRound({ buggy_line: Number(event.target.value) })}>
                      {Array.from({ length: codeLineCount }, (_, index) => <option value={index} key={index}>Line {index + 1}</option>)}
                    </select>
                    <div className="admin-bug-options">
                      <div>
                        <label>Diagnosis choices</label>
                        <select aria-label={`Number of diagnosis choices for Round ${roundIndex + 1}`} value={round.diagnoses.length} onChange={(event) => {
                          const size = Number(event.target.value);
                          updateRound({ diagnoses: resizeChoices(round.diagnoses, size), correct_diagnosis: Math.min(round.correct_diagnosis, size - 1) });
                        }}>
                          {[3, 4, 5].map((count) => <option value={count} key={count}>{count} choices</option>)}
                        </select>
                        {round.diagnoses.map((option, optionIndex) => <input aria-label={`Round ${roundIndex + 1} diagnosis ${optionIndex + 1}`} key={optionIndex} value={option} placeholder={`Diagnosis ${optionIndex + 1}`} onChange={(event) => updateRound({ diagnoses: round.diagnoses.map((item, index) => index === optionIndex ? event.target.value : item) })} />)}
                        <label htmlFor={`bug-diagnosis-correct-${roundIndex}`}>Correct diagnosis</label>
                        <select id={`bug-diagnosis-correct-${roundIndex}`} value={round.correct_diagnosis} onChange={(event) => updateRound({ correct_diagnosis: Number(event.target.value) })}>
                          {round.diagnoses.map((option, index) => <option value={index} key={index}>{option || `Diagnosis ${index + 1}`}</option>)}
                        </select>
                      </div>
                      <div>
                        <label>Repair choices</label>
                        <select aria-label={`Number of repair choices for Round ${roundIndex + 1}`} value={round.fixes.length} onChange={(event) => {
                          const size = Number(event.target.value);
                          updateRound({ fixes: resizeChoices(round.fixes, size), correct_fix: Math.min(round.correct_fix, size - 1) });
                        }}>
                          {[3, 4, 5].map((count) => <option value={count} key={count}>{count} choices</option>)}
                        </select>
                        {round.fixes.map((option, optionIndex) => <input aria-label={`Round ${roundIndex + 1} repair ${optionIndex + 1}`} key={optionIndex} value={option} placeholder={`Repair ${optionIndex + 1}`} onChange={(event) => updateRound({ fixes: round.fixes.map((item, index) => index === optionIndex ? event.target.value : item) })} />)}
                        <label htmlFor={`bug-fix-correct-${roundIndex}`}>Correct repair</label>
                        <select id={`bug-fix-correct-${roundIndex}`} value={round.correct_fix} onChange={(event) => updateRound({ correct_fix: Number(event.target.value) })}>
                          {round.fixes.map((option, index) => <option value={index} key={index}>{option || `Repair ${index + 1}`}</option>)}
                        </select>
                      </div>
                    </div>
                    <label htmlFor={`bug-explanation-${roundIndex}`}>Explanation shown after completion</label>
                    <textarea id={`bug-explanation-${roundIndex}`} rows={3} value={round.explanation} maxLength={600} onChange={(event) => updateRound({ explanation: event.target.value })} />
                  </section>
                );
              })}
              <label htmlFor="bug-hunt-duration">Total time limit</label>
              <select id="bug-hunt-duration" value={durationSeconds} onChange={(event) => setDurationSeconds(Number(event.target.value))}>
                <option value={75}>75 seconds</option>
                <option value={90}>90 seconds</option>
                <option value={120}>2 minutes</option>
              </select>
            </fieldset>
          )}

          {quizType === "multiple_choice" && <><label htmlFor="quiz-explanation">Answer Explanation</label>
          <textarea
            id="quiz-explanation"
            className="admin-quiz-explanation"
            value={explanation}
            maxLength={4000}
            rows={5}
            placeholder="Explain why the selected answer is correct. This appears only after a participant submits the quiz."
            onChange={(event) => setExplanation(event.target.value)}
          />
          <small>
            Optional. Participants will see this explanation after submitting their answer.
          </small></>}

          <p>
            This quiz will become available automatically on{" "}
            <strong>{readableDate(date)}</strong> and will remain available until the end of that day.
          </p>

          <button type="submit" disabled={savingQuiz}>
            {savingQuiz ? "Saving..." : editingQuizId ? "Save Quiz Changes" : "Schedule Quiz"}
          </button>

          {editingQuizId && (
            <button
              type="button"
              className="admin-cancel-button"
              onClick={cancelEdit}
              disabled={savingQuiz}
            >
              Cancel Edit
            </button>
          )}
        </form>

        {message && <p role="status">{message}</p>}
      </section>

      <section className="admin-section">
        <h3>Today's Quiz</h3>
        {loading ? (
          <p>Loading…</p>
        ) : todayQuizzes.length === 0 ? (
          <p>No quiz is scheduled for today.</p>
        ) : (
          todayQuizzes.map((quiz) => (
            <div className="admin-list-row" key={quiz.id}>
              <span>
                <strong>{quiz.question}</strong>{" "}
                <small>{quiz.date} · Today</small>
              </span>
              {quizActions(quiz)}
            </div>
          ))
        )}
      </section>

      <section className="admin-section">
        <h3>Upcoming Quizzes</h3>
        {loading ? (
          <p>Loading…</p>
        ) : scheduledQuizzes.length === 0 ? (
          <p>No future quizzes scheduled.</p>
        ) : (
          scheduledQuizzes.map((quiz) => (
            <div className="admin-list-row" key={quiz.id}>
              <span>
                <strong>{quiz.question}</strong>{" "}
                <small>{quiz.date} · Scheduled</small>
              </span>
              {quizActions(quiz)}
            </div>
          ))
        )}
      </section>

      <section className="admin-section">
        <h3>Users</h3>
        <input
          placeholder="Search username or email"
          value={userSearch}
          onChange={searchUsers}
        />

        {users.slice((userPage - 1) * 5, userPage * 5).map((user) => (
          <div className="admin-list-row" key={user.id}>
            <span>
              <strong>{user.username}</strong>{" "}
              <small>
                {user.email} · WhatsApp: {user.whatsapp_number || "Not provided"}
              </small>
            </span>

            {isPrimaryAdmin && user.role !== "admin" && (
              <button type="button" onClick={() => makeAdmin(user.id)}>
                Make Admin
              </button>
            )}

            <button
              type="button"
              disabled={user.role === "admin"}
              title={user.role === "admin" ? "Admin accounts cannot be removed" : "Remove user"}
              onClick={() => deleteUser(user.id)}
            >
              Remove
            </button>
          </div>
        ))}

        <nav className="admin-pagination" aria-label="User pages">
          {Array.from(
            { length: Math.max(1, Math.ceil(users.length / 5)) },
            (_, index) => index + 1,
          ).map((pageNumber) => (
            <button
              type="button"
              className={pageNumber === userPage ? "active" : ""}
              onClick={() => setUserPage(pageNumber)}
              key={pageNumber}
            >
              {pageNumber}
            </button>
          ))}
        </nav>
      </section>

      <section className="admin-section admin-insights-section">
        <MonthlyInsights days={stats} month={statsMonth} onMonthChange={changeStatsMonth} />
      </section>
    </div>
  );
}
