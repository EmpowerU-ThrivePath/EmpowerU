import express from "express";
import slugify from "slugify";

var router = express.Router();

router.get("/quizzes", async (req, res) => {
  try {
    const quizzes = await req.models.Quiz.find()
      .select("title slug description")
      .sort({ createdAt: -1 });
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/quizzes/:slug", async (req, res) => {
  try {
    const quiz = await req.models.Quiz.findOne({
      slug: req.params.slug,
    }).populate("questions"); // This ensures questions are fully loaded

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json(quiz);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.post("/quizzes/:slug/recommendation", async (req, res) => {
//   try {
//     const quiz = await models.Quiz.findOne({ slug: req.params.slug });
//     const userScores = req.body.scores; // { resume: 5, interview: 3 } from frontend

//     if (!quiz) {
//       return res.status(404).json({ message: "Quiz not found" });
//     }

//     if (!userScores || Object.keys(userScores).length === 0) {
//       return res.status(400).json({ message: "No scores provided." });
//     }

//     // 1. Find highest score
//     const maxScore = Math.max(...Object.values(userScores));
//     const winningResults = quiz.results.filter(
//       (r) => userScores[r.id] === maxScore
//     );

//     // 2. Select result - use default if tie
//     let recommendation;
//     if (winningResults.length > 1) {
//       recommendation = quiz.results.find((r) => r.default) || winningResults[0];
//     } else {
//       recommendation = winningResults[0];
//     }

//     res.json({
//       message: recommendation.message,
//     });
//   } catch (err) {
//     console.error("🔥 RECOMMENDATION ERROR:", err);
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { title, description, slug, questions, results } = req.body;

    if (!title || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Generate slug if not provided
    const generatedSlug = slug || slugify(title, { lower: true, strict: true });

    // Check if slug is already taken
    const existing = await req.models.Quiz.findOne({ slug: generatedSlug });
    if (existing) {
      return res.status(409).json({ error: "Slug already in use" });
    }

    // Create questions
    const createdQuestions = await req.models.Question.insertMany(
      questions.map((q) => ({
        id: q.id,
        type: q.type,
        question: q.question,
        options: q.options,
      }))
    );

    // Create quiz
    const quiz = await req.models.Quiz.create({
      title,
      slug: generatedSlug,
      description,
      questions: createdQuestions.map((q) => q._id),
      results,
    });

    res.status(201).json(quiz);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/:slug/recommendation", async (req, res) => {
  const { slug } = req.params;
  const { scores } = req.body;

  if (!scores || Object.keys(scores).length === 0) {
    return res.status(400).json({ message: "No scores provided." });
  }

  // Basic logic to find the top scoring category
  const topCategory = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  const message = `You scored highest in "${topCategory[0]}" – consider exploring tasks in that area!`;

  return res.json({ message });
});

export default router;
