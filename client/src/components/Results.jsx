import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Maps recommendation keywords to module display names
const resultToModuleId = {
  resume: "Resume",
  portfolio: "Portfolio",
  network: "Network",
  applying_for_jobs: "Applying for Jobs",
  behavioral_interview: "Behavioral Interview",
  interview: "Interview",
  product_case_interview: "Product Case Interview",
};

const Results = ({ slug, userScores }) => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // On mount: fetch the currently logged-in user's ID
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/login/loggedin`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.loggedIn) {
          setUserId(data.userId);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  // Fetch recommendation from backend based on user scores and quiz slug
  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/quizzes/${slug}/recommendation`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ scores: userScores }),
          }
        );

        if (!response.ok) throw new Error("Failed to get recommendations");

        const data = await response.json();
        setRecommendation(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [slug, userScores]);

  // Navigate back to dashboard. Commented-out section handles backend status update.
  const handleGoToDashboard = async () => {
    navigate("/home");
  };

  const handleGoToRoadmap = () => {
    if (!recommendation) {
      alert("No recommendation found. Please try again.");
      return;
    }

    // Attempt to match a keyword in the recommendation string to a known module
    const lowerRec = recommendation.toLowerCase();
    let moduleId = null;

    for (const keyword in resultToModuleId) {
      if (lowerRec.includes(keyword)) {
        moduleId = resultToModuleId[keyword];
        break;
      }
    }

    if (!moduleId) {
      console.warn(
        "No matching module found for recommendation:",
        recommendation
      );
      alert("We couldn’t match your result to a roadmap module.");
      return;
    }

    // Navigate to roadmap page with identified module ID in state
    navigate("/roadmap", { state: { moduleId } });
  };

  // Show loading or error messages if applicable
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
          <button className="result-button" onClick={handleGoToDashboard}>
            Go to Dashboard
          </button>
          <button className="result-button" onClick={handleGoToRoadmap}>
            Go to Roadmap
          </button>
        </div>
      </div>
      <div className="quiz-sidebar"></div>
    </div>
  );
};

export default Results;
