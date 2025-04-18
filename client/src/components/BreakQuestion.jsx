import React from "react";

const BreakQuestion = ({ question }) => {
  return (
    <div className="question-container">
      <p className="break-text">
        <strong>{question.question}</strong>
      </p>
    </div>
  );
};

export default BreakQuestion;
