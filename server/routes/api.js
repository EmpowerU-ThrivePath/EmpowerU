import express from "express";
import loginRouter from "./controllers/login.js";
import userRouter from "./controllers/users.js";
import settingsRouter from "./controllers/settings.js";
import quizzesRouter from "./controllers/quizzes.js";

var router = express.Router();

router.use("/login", loginRouter);
router.use("/user", userRouter);
router.use("/settings", settingsRouter);
router.use("/quizzes", quizzesRouter);

export default router;
