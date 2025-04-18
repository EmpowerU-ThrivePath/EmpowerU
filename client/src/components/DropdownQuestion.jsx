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
    <div className="dropdown-question">
      <h2>{question.question}</h2>

      <div className="dropdown-group">
        <select
          value={selections.year}
          onChange={(e) => handleChange("year", e.target.value)}
          className="dropdown-select"
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selections.month}
          onChange={(e) => handleChange("month", e.target.value)}
          className="dropdown-select"
          disabled={!selections.year}
        >
          <option value="">Select Month</option>
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
