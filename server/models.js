import mongoose from "mongoose";

let models = {};
console.log("connecting to mongodb");
await mongoose.connect(
  "mongodb+srv://easy:info441@paullohh.emcha.mongodb.net/websharerApp?retryWrites=true&w=majority&appName=paullohh"
);
console.log("successfully connected to mongodb!");

const profileSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  pronouns: String,
  email: String,
  grad_year: String,
  intended_career: String,
});
models.Profile = mongoose.model("Profile", profileSchema);

const optionSchema = new mongoose.Schema({
  label: String,
  value: String,
  next: { type: String, default: "" },
  result: { type: String, default: "" },
  points: { type: Number, default: 0 },
});
models.Option = mongoose.model("Option", optionSchema);

const questionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ["multiple", "multi", "dropdown", "break"],
  },
  question: { type: String, required: true },
  options: [optionSchema],
});
models.Question = mongoose.model("Question", questionSchema);

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  createdAt: { type: Date, default: Date.now },
  results: [
    {
      id: { type: String, required: true },
      default: Boolean,
      message: { type: String, required: true },
    },
  ],
});
models.Quiz = mongoose.model("Quiz", quizSchema);

export default models;
