import React, { useState } from "react";

const DropdownQuestion = ({ question, selectedValue, onAnswer }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => currentYear + i);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selections, setSelections] = useState({
    year: selectedValue?.year || "",
    month: selectedValue?.month || "",
  });

  const handleChange = (type, value) => {
    const newSelections = {
      ...selections,
      [type]: value,
    };

    setSelections(newSelections);

    if (newSelections.year && newSelections.month) {
      onAnswer(newSelections);
    }
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{question.question}</h2>

      <div className="dropdown-question">
        <p className="dropdown-description">Select Year</p>
        <select
          value={selections.year}
          onChange={(e) => handleChange("year", e.target.value)}
          className="dropdown-select"
        >
          <option value="">---</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <p className="dropdown-description">Select Month</p>
        <select
          value={selections.month}
          onChange={(e) => handleChange("month", e.target.value)}
          className="dropdown-select"
          disabled={!selections.year}
        >
          <option value="">---</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownQuestion;
