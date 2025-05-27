import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import QuestionComponents from "./QuestionComponents";
import Results from "./Results";
import QuizNavigation from "./QuizNavigation";

const TakeQuiz = ({ userPass, setHasTakenQuiz }) => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionId, setCurrentQuestionId] = useState("");
  const [answers, setAnswers] = useState({});
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState({});
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const updateQuizStat = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/quizstatus`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId: userPass }),
          }
        );
        if (response.ok) {
          setHasTakenQuiz(true);
        } else {
          throw new Error("Changes could not be saved");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("Could not update quiz status");
      }
    };

    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/quizzes/${slug}`
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

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/login/loggedin`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.loggedIn) {
          setUser(data.userId);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchQuiz();
    fetchUser();
    updateQuizStat();
  }, [slug]);

  // Handles user's answer to a question
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

    // Handles clicking the "Continue" button
  const handleContinue = () => {
    const currentQuestion = quiz.questions.find(
      (q) => q.id === currentQuestionId
    );

    if (currentQuestion.type === "break") {
      const nextId = currentQuestion.options[0]?.next; // Always use the break's next path
      if (nextId) {
        setHistory((prev) => [...prev, currentQuestionId]);
        setCurrentQuestionId(nextId);
        window.scrollTo(0, 0);
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
        window.scrollTo(0, 0);
        return;
      }
    }

    // Default next question if no branching
    const nextIndex =
      quiz.questions.findIndex((q) => q.id === currentQuestionId) + 1;
    if (nextIndex < quiz.questions.length) {
      setHistory((prev) => [...prev, currentQuestionId]);
      setCurrentQuestionId(quiz.questions[nextIndex].id);
      window.scrollTo(0, 0);
    } else {
      // Quiz completed - show results
      handleCompleteQuiz();
    }
  };

  // Handles "Back" button logic
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

  // Submits quiz result to the backend
  const submitQuizResult = async (finalResultId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/quizzes/${slug}/submit-result`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // include cookie session
          body: JSON.stringify({ resultId: finalResultId, userId: user }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit quiz result");
      }

      console.log("✅ Quiz result submitted");
    } catch (error) {
      console.error("Error submitting result:", error);
    }
  };

  // Finalizes the quiz and triggers result submission
  const handleCompleteQuiz = () => {
    // Determine the final resultId
    let finalResultId = null;
    let highestPoints = -Infinity;
    for (const [key, value] of Object.entries(results)) {
      if (value > highestPoints) {
        highestPoints = value;
        finalResultId = key;
      }
    }

    if (finalResultId && !hasSubmitted) {
      submitQuizResult(finalResultId);
      setHasSubmitted(true);
    }

    setCurrentQuestionId("results");
    window.scrollTo(0, 0);
  };

  // Render quiz or results view
  return (
    <div className="quiz-container">
      {currentQuestionId === "results" ? (
        <Results quizId={slug} userScores={results} user={user} />
      ) : (
        <>
          <div className="quiz-content">
            {currentQuestion && (
              <QuestionComponent
                question={currentQuestion}
                selectedValue={answers[currentQuestionId]}
                onAnswer={(answer) => handleAnswer(currentQuestionId, answer)}
              />
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
          <div className="quiz-sidebar"></div>
        </>
      )}
    </div>
  );
};

export default TakeQuiz;
