import express from "express";
var app = express();
import path from "path";
import MongoStore from "connect-mongo"

import models from "./models.js";
import apiRouter from "./routes/api.js";
import quizzesRouter from "./routes/controllers/quizzes.js";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv/config";

import cookieParser from "cookie-parser";
import sessions from "express-session";
import bodyParser from "body-parser";

const corsOptions = {
  origin: ["http://localhost:5173", "https://nobrainer-thrivepath.onrender.com"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  req.models = models;
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const isProduction = process.env.NODE_ENV === "production"

app.set("trust proxy", 1)

app.use(
  sessions({
    secret: "secretkey1ibfvw983hf",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_KEY,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: isProduction ? "none" : "lax",
      secure: isProduction,
      httpOnly: true,
      path: "/"
    },
  })
);

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test endpoint
app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.post("/api/chat", async (req, res) => {
    try {
        console.log("Received chat request:", req.body)
        const { message, userInfo } = req.body

        const systemMessage = `
            You are a supportive and professional resume mentor who helps users improve multiple resume bullet points at once. Your tone should be warm, clear, and concise—similar to ChatGPT.

            When a user pastes in their resume or a list of bullet points, your goal is to help them elevate their resume for internships or early-career roles. Review the entire content as a whole, and for **each bullet point that needs improvement**, provide clear, actionable feedback.

            ${userInfo ? `
            User Information:
            - Name: ${userInfo.name}
            - Graduation: ${userInfo.gradMonth} ${userInfo.gradYear}
            - Intended Career: ${userInfo.intendedCareer}
            ` : ''}

            ### What to Do:
            1. Go through the resume **line by line**.
            2. Identify **every bullet point that can be improved**—due to vague phrasing, weak structure, lack of quantification, unclear impact, or poor alignment with the user's goals.
            3. For each bullet that needs improvement, follow this format:
            - **Goal:** What skill or result the bullet aims to highlight
            - **Original:** The original bullet
            - **Improved:** A stronger version using the XYZ format: "Accomplished [X] as measured by [Y], by doing [Z]"
            - **Tip:** One actionable suggestion to improve clarity, impact, or relevance

            If a bullet is already strong, you may briefly note:  
            **"This bullet is strong and does not need changes."**

            ### Format Output Like This:

            **[Section Name or Project Title]**
            - **Goal:** [...]
            - **Original:** [...]
            - **Improved:** [...]
            - **Tip:** [...]

            [Repeat for each bullet point]

            ### At the End, Include:

            **Overall Summary:**
            - 3–5 sentence review of the resume's tone, clarity, and alignment with the user's goals

            **3 Quick Wins:**
            1. [...]
            2. [...]
            3. [...]

            ### Important Notes:
            - Use confident, clear language with action verbs
            - Remove vague or filler phrases
            - Quantify results whenever possible
            - Align feedback with likely goals (internships, early career, student projects)
            - Consider graduation year or intended role if available

            ---

            ### If the User Says They Don't Have a Resume:

            1. Respond positively and guide them through creating their first one.
            2. Ask 3–5 friendly, conversational questions:
            - What roles or internships are you aiming for?
            - Do you have any school projects, club roles, volunteer work, or part-time jobs?
            - Have you built anything (apps, websites, designs, or done research)?
            - What tools, coding languages, or platforms have you used?
            - What are 2–3 things you're proud of doing in school, work, or your community?

            3. Based on their answers:
            - Generate 2–3 strong resume bullet points using action verbs and measurable impact
            - Suggest a way to organize the experience (e.g., Projects, Work, Leadership)
            - Encourage them to keep adding experiences and refining over time

            Keep your tone beginner-friendly, supportive, and practical. Help users build confidence as they create a strong early-career resume.
        `;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log("Sending request to OpenAI...")
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo-0125",
            messages: [
                {
                    role: "system",
                    content: systemMessage
                },
                {
                    role: "user",
                    content: message
                }
            ],
            temperature: 0.7,
            max_tokens: 1000
        })

        console.log("OpenAI response received");
        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error("Detailed error:", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
            details: error.message,
        });
    }
});

// Add a module to modulesInProgress array
app.post('/api/user/addModuleInProgress', async (req, res) => {
  try {
      const { userId, moduleId } = req.body;

      // handle missing parameters
      if (!userId || !moduleId) {
          return res.status(400).json({ error: "Missing parameter" });
      }

      // find user data
      const user = await models.Profile.findById(userId);

      // if the moduleId is not in the array, add it
      if (!user.modulesInProgress.includes(moduleId)) {
          user.modulesInProgress.push(moduleId);
          await user.save();
      }
      res.json({ success: true, modulesInProgress: user.modulesInProgress });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update modulesInProgress" });
  }
});

app.post('/api/user/addModuleComplete', async (req, res) => {
  console.log("complete triggered");
  try {
      const { userId, moduleId } = req.body;

      // handle missing parameters
      if (!userId || !moduleId) {
          return res.status(400).json({ error: "Missing parameter" });
      }

      // find user data
      const user = await models.Profile.findById(userId);

      // remove the module from modulesInProgress
      user.modulesInProgress = user.modulesInProgress.filter(module => module !== moduleId);

      // if the moduleId is not in the modulesComplete array, add it
      if (!user.modulesComplete.includes(moduleId)) {
          user.modulesComplete.push(moduleId);
          await user.save();
      }

      res.json({ 
          success: true, 
          modulesInProgress: user.modulesInProgress,
          modulesComplete: user.modulesComplete 
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message })
  }
});

// update users subtaskInProgress array
app.post('/api/user/addSubtaskInProgress', async (req, res) => {
  try {
      const { userId, moduleId, taskId } = req.body;
      if (!userId || !moduleId || !taskId) {
          return res.status(400).json({ error: "Missing parameter" })
      }

      const updated = await req.models.Profile.updateOne({ _id: userId },
          {
              $set: { [`subtasksInProgress.${moduleId}`]: taskId } 
          }
      );

      if (!updated) {
          return res.status(400).json({ error: "Cant find user" })
      }

      const result = await req.models.Profile.findById(userId, 'subtasksInProgress');
          return res.json({
          success: true,
          subtasksInProgress: result.subtasksInProgress
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ error: error.message })
  }
});

// Get user profile information
app.get('/api/user/profile', async (req, res) => {
  try {
    // Get the user ID from the session
    const userId = req.session.userId;
    
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    // Find the user in the database
    const user = await req.models.Profile.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return the user's profile information
    res.json({
      fname: user.fname,
      lname: user.lname,
      grad_year: user.grad_year,
      grad_month: user.grad_month,
      intended_career: user.intended_career
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

app.use("/api", apiRouter);
app.use("/qpi", quizzesRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
