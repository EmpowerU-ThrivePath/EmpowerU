import React from "react";

const QuizNavigation = ({
  currentQuestion,
  answers,
  onContinue,
  onBack,
  history,
}) => {
  const isContinueDisabled =
    currentQuestion.type !== "break" &&
    (!answers[currentQuestion.id] ||
      (Array.isArray(answers[currentQuestion.id]) &&
        answers[currentQuestion.id].length === 0));

  return (
    <div className="quiz-navigation">
      {history.length > 0 && (
        <button className="back-button" onClick={onBack}>
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
