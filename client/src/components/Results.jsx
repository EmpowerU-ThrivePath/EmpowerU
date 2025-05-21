import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Results = ({ slug, userScores }) => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/login/loggedin", {
          credentials: "include",
        });
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
        setRecommendation(data.message);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [slug, userScores]);

  const handleGoToDashboard = async () => {
    try {
      if (!userId) {
        console.error('No user ID available');
        alert('Please log in again to complete the quiz.');
        return;
      }

      console.log('Updating quiz status for user:', userId);
      
      // Update quiz completion status in database
      const response = await fetch('http://localhost:3000/api/user/update-quiz-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update quiz status');
      }

      // Verify the update was successful
      const verifyResponse = await fetch(`http://localhost:3000/api/user?userId=${userId}`);
      const userData = await verifyResponse.json();
      
      console.log('Verification response:', userData);
      
      if (userData.hasCompletedQuiz) {
        // Force a page reload to refresh the app state
        window.location.href = '/home';
      } else {
        console.error('Quiz status not updated properly');
        alert('There was an error completing the quiz. Please try again.');
      }
    } catch (error) {
      console.error('Error updating quiz status:', error);
      alert(error.message || 'There was an error completing the quiz. Please try again.');
    }
  };

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
