import React from "react";

const MultipleChoiceQuestion = ({ question, selectedValue, onAnswer }) => {
  const handleChange = (e) => {
    onAnswer(e.target.value);
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question.question}</h2>
      <div className="options-grid">
        {question.options.map((option) => (
          <label key={option.value} className="option-card">
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={handleChange}
              className="option-input"
            />
            <span className="option-text">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
