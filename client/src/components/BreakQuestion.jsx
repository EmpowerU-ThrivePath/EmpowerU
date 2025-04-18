import React from "react";

const BreakQuestion = ({ question }) => {
  return (
    <div className="break-question">
      <h2>Important Information</h2>
      <p>{question.question}</p>
    </div>
  );
};

export default BreakQuestion;
