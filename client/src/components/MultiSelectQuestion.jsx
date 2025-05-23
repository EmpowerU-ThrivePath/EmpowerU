import React from "react";

const MultiSelectQuestion = ({ question, selectedValue = [], onAnswer }) => {
  const handleOptionClick = (value) => {
    const newValues = selectedValue.includes(value)
      ? selectedValue.filter((v) => v !== value) // Remove if already selected
      : [...selectedValue, value]; // Add if not selected
    onAnswer(newValues);
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question.question}</h2>
      <div className="options-grid">
        {question.options.map((option) => (
          <div
            key={option.value}
            className={`option-card ${selectedValue.includes(option.value) ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.value)}
          >
            <span className="option-label">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectQuestion;
