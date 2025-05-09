import React, { useState, useEffect } from "react";

const Results = ({ quizId, userScores }) => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(`/api/quizzes/${quizId}/recommendation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ scores: userScores }),
        });

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
  }, [quizId, userScores]);

  if (loading) return <div className="loading">Analyzing your results...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div>
      <h2 className="question-text">
        Based on your answers, we suggest the following:
      </h2>
      {recommendation && (
        <div>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default Results;
