const BreakQuestion = ({ question, selectedValue, onSelect }) => {
  return (
    <div>
      <h2>{question.question}</h2>
      <div>
        {question.options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name={question.id}
              value={option.value}
              checked={selectedValue === option.value}
              onChange={() => onSelect(option.value)}
            />
            {option.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BreakQuestion;
