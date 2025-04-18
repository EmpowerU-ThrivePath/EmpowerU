import React from "react";

const MultipleChoiceQuestion = ({ question, selectedValue, onAnswer }) => {
  const handleChange = (e) => {
    onAnswer(e.target.value);
  };

  return (
    <div className="multiple-choice-question">
      <h2>{question.question}</h2>
      <div className="options-container">
        {question.options.map((option) => (
          <label key={option.value} className="option-label">
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
