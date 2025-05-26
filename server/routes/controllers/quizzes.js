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

router.get("/:slug", async (req, res) => {
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

router.post("/", async (req, res) => {
  try {
    const { title, description, slug, questions, results, isOnboarding } =
      req.body;

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
      isOnboarding: Boolean(isOnboarding),
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
  const message = `We recommend working on the "${topCategory[0]}" category – consider exploring tasks in that area!`;

  return res.json({ message });
});

router.post("/:slug/submit-result", async (req, res) => {
  const { resultId } = req.body;
  const { slug } = req.params;
  const userId = req.session?.userId || "anonymous"; // Replace with actual user ID if available

  if (!resultId) {
    return res.status(400).json({ error: "Missing resultId in request body." });
  }

  try {
    const quiz = await req.models.Quiz.findOne({ slug });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Only save if quiz is marked as onboarding
    if (quiz.isOnboarding) {
      await req.models.Result.create({
        user: userId,
        quiz: quiz._id,
        resultId,
      });

      console.log("✅ Onboarding quiz result saved");
    } else {
      console.log("⏭ Not onboarding — result not saved");
    }

    res.json({ message: "Result processed." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save quiz result." });
  }
});

router.delete("/:slug", async (req, res) => {
  try {
    const quiz = await req.models.Quiz.findOneAndDelete({
      slug: req.params.slug,
    });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    res.json({ message: "Quiz deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
