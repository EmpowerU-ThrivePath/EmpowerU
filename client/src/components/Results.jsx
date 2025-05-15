import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Results = ({ slug, userScores }) => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/quizzes/${slug}/recommendation`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scores: userScores }),
          }
        );

        if (!response.ok) throw new Error("Failed to get recommendations");

        const data = await response.json();
        setRecommendation(data.message); // Now only storing the message string
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [slug, userScores]);

  if (loading) return <div className="loading">Analyzing your results...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <h2 className="result-text">
          Based on your answers, we suggest the following:
        </h2>
        {recommendation && (
          <div>
            <p className="suggestions">{recommendation}</p>
          </div>
        )}
        <div className="result-button-container">
          <button className="result-button" onClick={() => navigate("/home")}>
            Go to Dashboard
          </button>
          <button
            className="result-button"
            onClick={() => navigate("/roadmap")}
          >
            Go to Roadmap
          </button>
        </div>
      </div>
      <div className="quiz-sidebar"></div>
    </div>
  );
};

export default Results;
