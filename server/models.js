import mongoose from "mongoose";
const { Schema } = mongoose;
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;
import dotenv from "dotenv/config";

let models = {};
console.log("connecting to mongodb");
await mongoose.connect(process.env.MONGODB_KEY);
console.log("successfully connected to mongodb!");

const profileSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  pronouns: String,
  email: String,
  grad_month: String,
  grad_year: String,
  intended_career: String,
  password: { type: String, required: true },
  avatar: String,
  hasCompletedQuiz: { type: Boolean, default: false },
  modulesInProgress: Array,
  modulesComplete: Array,
  subtasksInProgress: { type: Object, default: {} }
});

profileSchema.pre("save", function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

profileSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});

const optionSchema = new mongoose.Schema({
  label: String,
  value: String,
  next: { type: String, default: "" },
  result: { type: String, default: "" },
  points: { type: Number, default: 0 },
});

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
  isOnboarding: { type: String, required: true },
});

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
    required: true,
  },
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
  resultId: { type: String, required: true },
  completedAt: { type: Date, default: Date.now },
});

models.Message = mongoose.model("Message", messageSchema);
models.Profile = mongoose.model("Profile", profileSchema);
models.Option = mongoose.model("Option", optionSchema);
models.Question = mongoose.model("Question", questionSchema);
models.Quiz = mongoose.model("Quiz", quizSchema);
models.Result = mongoose.model("Result", resultSchema);
console.log("mongoose models created");

export default models;
