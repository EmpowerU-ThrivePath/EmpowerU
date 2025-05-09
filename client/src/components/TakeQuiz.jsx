import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QuestionComponents from "./QuestionComponents";
import Results from "./Results";
import QuizNavigation from "./QuizNavigation";
import QuizProgress from "./QuizProgress";

const TakeQuiz = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/quizzes/${slug}`
        );
        if (!response.ok) throw new Error("Quiz not found");
        const data = await response.json();

        setQuiz(data);
        setCurrentQuestionId(data.questions[0]?.id || "");
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [slug]);

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }));

    const question = quiz.questions.find((q) => q.id === questionId);
    if (question?.options?.some((opt) => opt.result)) {
      setResults((prev) => {
        const newResults = { ...prev };

        if (Array.isArray(answer)) {
          answer.forEach((val) => {
            const option = question.options.find((opt) => opt.value === val);
            if (option?.result) {
              newResults[option.result] =
                (newResults[option.result] || 0) + (option.points || 1);
            }
          });
        } else {
          const option = question.options.find((opt) => opt.value === answer);
          if (option?.result) {
            newResults[option.result] =
              (newResults[option.result] || 0) + (option.points || 1);
          }
        }
        return newResults;
      });
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!quiz) return <div>Quiz not found</div>;

  const currentQuestion =
    currentQuestionId !== "results"
      ? quiz.questions.find((q) => q.id === currentQuestionId)
      : null;

  const QuestionComponent =
    currentQuestion && QuestionComponents[currentQuestion.type];

  const handleContinue = () => {
    const currentQuestion = quiz.questions.find(
      (q) => q.id === currentQuestionId
    );

    if (currentQuestion.type === "break") {
      const nextId = currentQuestion.options[0]?.next; // Always use the break's next path
      if (nextId) {
        setHistory((prev) => [...prev, currentQuestionId]);
        setCurrentQuestionId(nextId);
        return;
      }
    }
    if (
      !answers[currentQuestionId] ||
      (Array.isArray(answers[currentQuestionId]) &&
        answers[currentQuestionId].length === 0)
    ) {
      return;
    }

    // Handle branching logic
    if (
      currentQuestion.type === "multiple" ||
      currentQuestion.type === "dropdown"
    ) {
      const selectedOption = currentQuestion.options.find(
        (opt) => opt.value === answers[currentQuestionId]
      );
      if (selectedOption?.next) {
        setHistory((prev) => [...prev, currentQuestionId]);
        setCurrentQuestionId(selectedOption.next);
        return;
      }
    }

    // Default linear progression
    const nextIndex =
      quiz.questions.findIndex((q) => q.id === currentQuestionId) + 1;
    if (nextIndex < quiz.questions.length) {
      setHistory((prev) => [...prev, currentQuestionId]);
      setCurrentQuestionId(quiz.questions[nextIndex].id);
    } else {
      // Quiz completed - show results
      setCurrentQuestionId("results");
    }
  };

  const handleBack = () => {
    if (history.length === 0) {
      // If we're on the first question and the user presses "Back", go to the previous page
      navigate(-1);
    } else {
      // Otherwise, pop the last question off the history and go back to it
      const prevHistory = [...history];
      const previousId = prevHistory.pop();

      setHistory(prevHistory);
      setCurrentQuestionId(previousId);
    }
  };

  return (
    <div className="quiz-container">
      {currentQuestionId === "results" ? (
        <Results quizId={slug} userScores={results} />
      ) : (
        <>
          <div className="quiz-content">
            {currentQuestion && (
              <QuestionComponent
                question={currentQuestion}
                selectedValue={answers[currentQuestionId]}
                onAnswer={(answer) => handleAnswer(currentQuestionId, answer)}
              />
              // </>
            )}
            <QuizNavigation
              currentQuestion={currentQuestion}
              answers={answers}
              onContinue={handleContinue}
              onBack={handleBack}
              history={history}
              prevPageBack={quiz.questions[0].id === currentQuestionId}
            />
          </div>
          <div className="quiz-sidebar">
            <QuizProgress
              questions={quiz.questions}
              currentId={currentQuestionId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TakeQuiz;
