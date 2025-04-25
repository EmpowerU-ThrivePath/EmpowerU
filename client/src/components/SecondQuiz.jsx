// import React, { useState } from "react";
// import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
// import MultiSelectQuestion from "./MultiSelectQuestion";
// import DropdownQuestion from "./DropdownQuestion";
// import BreakQuestion from "./BreakQuestion";
// import Results from "./Results";

// const questions = [
//   {
//     id: "start",
//     type: "break",
//     question: "Not sure where to start?",
//     options: {
//       label: "placeholder",
//       value: "placeholder",
//       next: "finish-header",
//       result: "",
//       points: 0,
//     },
//   },
//   {
//     id: "finish-header",
//     type: "multiple",
//     question: "Have you finished your resume header?",
//     options: [
//       {
//         label: "Yes",
//         value: "yes",
//         next: "education-coursework",
//         result: "",
//         points: 0,
//       },
//       {
//         label: "No",
//         value: "no",
//         next: "education-coursework",
//         result: "",
//         points: 0,
//       },
//     ],
//   },
//   {
//     id: "education-coursework",
//     type: "multiple",
//     question: "Have you included your education and relevant coursework?",
//     options: [
//       {
//         label: "Yes",
//         value: "yes",
//         next: "professional-experience",
//         result: "",
//         points: 0,
//       },
//       {
//         label: "No",
//         value: "no",
//         next: "professional-experience",
//         result: "",
//         points: 0,
//       },
//     ],
//   },
//   {
//     id: "professional-experience",
//     type: "multiple",
//     question: "Do you have any professional software engineering experience?",
//     options: [
//       {
//         label: "Yes",
//         value: "yes",
//         next: "general-experience",
//         result: "",
//         points: 0,
//       },
//       {
//         label: "No",
//         value: "no",
//         next: "general-experience",
//         result: "",
//         points: 0,
//       },
//     ],
//   },
//   {
//     id: "general-experience",
//     type: "multiple",
//     question: "Do you have general work experience?",
//     options: [
//       {
//         label: "Yes",
//         value: "yes",
//         next: "extracurriculars",
//         result: "",
//         points: 0,
//       },
//       {
//         label: "No",
//         value: "no",
//         next: "extracurriculars",
//         result: "",
//         points: 0,
//       },
//     ],
//   },
//   {
//     id: "extracurriculars",
//     type: "multiple",
//     question: "Do you have general work experience?",
//     options: [
//       {
//         label: "Yes",
//         value: "yes",
//         next: "data-driven",
//         result: "",
//         points: 0,
//       },
//       { label: "No", value: "no", next: "data-driven", result: "", points: 0 },
//     ],
//   },
//   {
//     id: "data-driven",
//     type: "multiple",
//     question: "Do you have general work experience?",
//     options: [
//       {
//         label: "Yes",
//         value: "yes",
//         next: "professional-experience",
//         result: "",
//         points: 0,
//       },
//       {
//         label: "No",
//         value: "no",
//         next: "professional-experience",
//         result: "",
//         points: 0,
//       },
//       {
//         label: "I'm not sure what that is",
//         value: "unsure",
//         next: "professional-experience",
//         result: "",
//         points: 0,
//       },
//     ],
//   },
// ];
