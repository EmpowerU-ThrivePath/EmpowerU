import React from "react";

const Results = ({ results }) => {
  const getRecommendation = () => {
    const { resume, interview } = results;
    if (resume >= interview) {
      return {
        primary: "resume",
        message: "Resume",
      };
    } else {
      return {
        primary: "interview",
        message: "Interview Prep",
      };
    }
  };
  const recommendation = getRecommendation();

  return (
    <div>
      <h2 className="question-text">
        Based on your answers, we suggest the following:
      </h2>
      <ul className="suggestions">
        <li>{recommendation.message}</li>
      </ul>
      <p className="result-text">
        With our success roadmap, you'll confidently tackle these tasks and
        uncover the hidden insights that come with them.
      </p>
    </div>
  );
};

export default Results;
