import React, { useState } from "react";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import MultiSelectQuestion from "./MultiSelectQuestion";
import DropdownQuestion from "./DropdownQuestion";
import BreakQuestion from "./BreakQuestion";

const questions = [
  {
    id: "graduation-date",
    type: "dropdown",
    question: "What is your estimated graduation date?",
  },
  {
    id: "long-term-goal",
    type: "multiple",
    question: "What long term goal would you like to focus on right now?",
    options: [
      {
        label: "I want to secure a new grad role",
        value: "grad-role",
        next: "career-interest",
      },
      {
        label: "I want to get an internship",
        value: "internship",
        next: "career-interest",
      },
      {
        label: "I am in between new grad roles and internships",
        value: "grad-internship",
        next: "career-interest",
      },
      {
        label: "I want to be a good student",
        value: "good-student",
        next: "career-interest",
      },
      {
        label: "I don't know what my goal is yet",
        value: "unsure",
        next: "internship-experience",
      },
    ],
  },
  {
    id: "internship-experience",
    type: "multiple",
    question: "Have you had an internship before?",
    options: [
      { label: "Yes", value: "yes", next: "break-1" },
      { label: "No", value: "no", next: "break-2" },
    ],
  },
  {
    id: "break-1",
    type: "break",
    question:
      "Based on your graduation date, we suggest focusing on both new grad roles and internships.",
    options: [
      { label: "placeholder", value: "something-1", next: "career-interest" },
    ],
  },
  {
    id: "break-2",
    type: "break",
    question: "That's okay, let's focus on finding an internship for now!",
    options: [
      { label: "placeholder", value: "something-2", next: "career-interest" },
    ],
  },
  {
    id: "career-interest",
    type: "multiple",
    question: "What career are you interested in/trying to pursue?",
    options: [
      {
        label: "Software engineer",
        value: "software",
        next: "confident-areas",
      },
      { label: "UX designer", value: "design", next: "confident-areas" },
      { label: "Data analyst", value: "data", next: "confident-areas" },
      { label: "Product manager", value: "pm", next: "confident-areas" },
      {
        label: "I don't know what I want to do yet",
        value: "unsure-2",
        next: "break-3",
      },
      {
        label: "None of these are my goal",
        value: "no-interest",
        next: "confident-areas",
      },
    ],
  },
  {
    id: "break-3",
    type: "break",
    question:
      "We recommend taking a career quiz which will help you get the most out of this website by identifying your interests and potential career paths. However, if you're unsure and want to explore your options, you can still continue - we'll provide career advice, guidance, and resources to help you gain clarity and take the next step.",
    options: [
      { label: "placeholder", value: "something-3", next: "confident-areas" },
    ],
  },
  {
    id: "confident-areas",
    type: "multi",
    question: "Select all that you have done and feel confident in:",
    options: [
      {
        label: "Networking & reaching out to professionals",
        value: "networking",
        next: null,
      },
      {
        label: "Understanding job market expectations",
        value: "job-market",
        next: null,
      },
      {
        label: "Applying for jobs/internships",
        value: "applying",
        next: null,
      },
      { label: "Resume", value: "resume", next: null },
      { label: "Personal website/portfolio", value: "website", next: null },
      { label: "Branding", value: "branding", next: null },
      { label: "Linkedin profile", value: "linkedin", next: null },
      { label: "Technical interviews", value: "technical", next: null },
      { label: "Behavioral interview prep", value: "behavioral", next: null },
      { label: "Product case interviews", value: "product-case", next: null },
    ],
  },
];

const OnboardingQuiz = () => {
  const [currentQuestionId, setCurrentQuestionId] = useState(questions[0].id);
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);
  const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);

  if (!currentQuestion) return <div>Question not found</div>;

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionId]: answer,
    }));
  };

  const handleContinue = () => {
    if (currentQuestion.type === "break") {
      const nextIndex = currentIndex + 1;
      if (nextIndex < questions.length) {
        setHistory((prev) => [...prev, currentQuestionId]);
        setCurrentQuestionId(questions[nextIndex].id);
      }
      return;
    }

    if (
      !answers[currentQuestionId] ||
      (Array.isArray(answers[currentQuestionId]) &&
        answers[currentQuestionId].length === 0)
    ) {
      return;
    }

    setHistory((prev) => [...prev, currentQuestionId]);

    if (currentQuestion.type === "multiple") {
      const selectedOption = currentQuestion.options.find(
        (opt) => opt.value === answers[currentQuestionId]
      );
      if (selectedOption?.next) {
        setCurrentQuestionId(selectedOption.next);
        return;
      }
    }

    const nextIndex = currentIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionId(questions[nextIndex].id);
    } else {
      console.log("Quiz completed!", answers);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;

    const prevHistory = [...history];
    const previousId = prevHistory.pop();

    setHistory(prevHistory);
    setCurrentQuestionId(previousId);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case "multiple":
        return (
          <MultipleChoiceQuestion
            question={currentQuestion}
            selectedValue={answers[currentQuestionId]}
            onAnswer={handleAnswer}
          />
        );
      case "multi":
        return (
          <MultiSelectQuestion
            question={currentQuestion}
            selectedValue={answers[currentQuestionId] || []}
            onAnswer={handleAnswer}
          />
        );
      case "dropdown":
        return (
          <DropdownQuestion
            question={currentQuestion}
            selectedValue={answers[currentQuestionId]}
            onAnswer={handleAnswer}
          />
        );
      case "break":
        return <BreakQuestion question={currentQuestion} />;
      default:
        return <div>Unfamiliar question type.</div>;
    }
  };

  return (
    <div className="parent-container">
      <div className="quiz-container">
        <div className="quiz-content">
          {renderQuestion()}

          <div className="quiz-navigation">
            {history.length > 0 && (
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
            )}
            {currentQuestion.type !== "break" && (
              <button
                className={`continue-button ${
                  currentQuestion.type === "break" ? "break-continue" : ""
                }`}
                onClick={handleContinue}
                disabled={
                  currentQuestion.type !== "break" &&
                  (!answers[currentQuestionId] ||
                    (Array.isArray(answers[currentQuestionId]) &&
                      answers[currentQuestionId].length === 0))
                }
              >
                Continue
              </button>
            )}
            {currentQuestion.type === "break" && (
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
            )}
          </div>
        </div>

        <div className="quiz-sidebar"></div>
      </div>
    </div>
  );
};

export default OnboardingQuiz;
