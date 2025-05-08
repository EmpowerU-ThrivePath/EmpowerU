import express from 'express';
var app = express();
import path from 'path'


import router from './routes/api.js'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


import cors from "cors"
import OpenAI from 'openai'
import dotenv from "dotenv/config"
    

const corsOptions = {
    origin: ["http://localhost:5173"],
}
app.use(cors(corsOptions))
app.use(express.json())

import models from './models.js'

app.use((req, res, next) => {
    req.models = models
    next()
})

import apiRouter from "./routes/api.js"

app.use('/api', apiRouter)

import cookieParser from 'cookie-parser';
import sessions from 'express-session';


// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "secretkey1ibfvw983hf",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

var session


// Initialize OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// Test endpoint
app.get("/api/test", (req, res) => {
    res.json({ message: "Server is working!" })
})

app.post("/api/chat", async (req, res) => {
    try {
        console.log("Received chat request:", req.body)
        const { message, userInfo } = req.body

        const systemMessage = `
            You are a supportive and professional resume mentor. 
            ${userInfo ? `
            User Information:
            - Graduation Year: ${userInfo.grad_year}
            - Intended Career: ${userInfo.intended_career}
            ` : ''}

            Your job is to help the user improve their resume bullet points to better align with their career goals.

            - Rewrite weak bullets using Google's XYZ format: "Accomplished [X] as measured by [Y], by doing [Z]".
            - Provide clear, actionable advice.
            - Keep suggestions concise and professional.
            - Use a positive and encouraging tone.
            - Consider the user's graduation year and intended career path when providing feedback.

            Format your response like this:
            1. Goal: [summarize the goal]
            2. Original Bullet: [repeat the original]
            3. Improved Bullet: [your improved version]
            4. Tips: [brief tip or reasoning]
        `;
        
        if (!message) {
            return res.status(400).json({ error: "Message is required" })
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
            max_tokens: 2000
        })

        console.log("OpenAI response received")
        res.json({ response: completion.choices[0].message.content })
    } catch (error) {
        console.error("Detailed error:", error)
        res.status(500).json({ 
            error: "An error occurred while processing your request",
            details: error.message 
        })
    }
})

app.use('/api', apiRouter);

app.listen(3000, () => {
    console.log("Server listening on port 3000")
})

