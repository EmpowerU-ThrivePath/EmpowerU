import React from "react";

const MultiSelectQuestion = ({ question, selectedValue = [], onAnswer }) => {
  const handleOptionClick = (value) => {
    const newValues = selectedValue.includes(value)
      ? selectedValue.filter((v) => v !== value) // Remove if already selected
      : [...selectedValue, value]; // Add if not selected
    onAnswer(newValues);
  };

  return (
    <div className="multi-select-container">
      <h2 className="question-text">{question.question}</h2>
      <div className="options-list">
        {question.options.map((option) => (
          <div
            key={option.value}
            className={`option-card ${
              selectedValue.includes(option.value) ? "selected" : ""
            }`}
            onClick={() => handleOptionClick(option.value)}
          >
            <input
              type="checkbox"
              checked={selectedValue.includes(option.value)}
              readOnly // We handle clicks via the parent div
              className="hidden-checkbox"
            />
            <span className="option-label">{option.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelectQuestion;
