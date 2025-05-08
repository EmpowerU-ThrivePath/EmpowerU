import React from "react";

const QuizProgress = ({ questions, currentId }) => {
  if (!questions || !currentId) return null;

  const currentIndex = questions.findIndex((q) => q.id === currentId);
  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="quiz-progress">
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>
        Question {currentIndex + 1} of {questions.length}
      </p>
    </div>
  );
};

export default QuizProgress;
