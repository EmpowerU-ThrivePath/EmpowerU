import express from "express";
var app = express();
import path from "path";

import models from "./models.js";
import apiRouter from "./routes/api.js";

import router from "./routes/api.js";
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
  origin: ["http://localhost:5173"],
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

app.use(
  sessions({
    secret: "secretkey1ibfvw983hf",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "lax",
      secure: false,
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
    console.log("Received chat request:", req.body);
    const { message } = req.body;

    const systemMessage = `
            You are a supportive and professional resume mentor. The user's career goal is: tech related.
         

            Your job is to help the user improve their resume bullet points to better align with this goal.

            - Rewrite weak bullets using Google’s XYZ format: "Accomplished [X] as measured by [Y], by doing [Z]".
            - Provide clear, actionable advice.
            - Keep suggestions concise and professional.
            - Use a positive and encouraging tone.

            Format your response like this:
            1. Goal: [summarize the goal]
            2. Original Bullet: [repeat the original]
            3. Improved Bullet: [your improved version]
            4. Tips: [brief tip or reasoning]
        `;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    console.log("Sending request to OpenAI...");
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: systemMessage,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 80,
    });

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

app.use("/api", apiRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
