import React from "react";
import { useNavigate } from "react-router-dom";

const QuizNavigation = ({
  currentQuestion,
  answers,
  onContinue,
  onBack,
  history,
  prevPageBack,
}) => {
  const navigate = useNavigate();

  const isContinueDisabled =
    currentQuestion.type !== "break" &&
    (!answers[currentQuestion.id] ||
      (Array.isArray(answers[currentQuestion.id]) &&
        answers[currentQuestion.id].length === 0));

  return (
    <div className="quiz-navigation">
      {(prevPageBack || history.length > 0) && (
        <button
          className="back-button"
          onClick={prevPageBack ? () => navigate(-1) : onBack}
        >
          Back
        </button>
      )}
      <button
        className={`continue-button ${
          currentQuestion.type === "break" ? "break-continue" : ""
        }`}
        onClick={onContinue}
        disabled={isContinueDisabled}
      >
        {currentQuestion.type === "break" ? "Continue" : "Next"}
      </button>
    </div>
  );
};

export default QuizNavigation;
