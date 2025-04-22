import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import NavBar from "./components/NavBar";
import Profile from "./screens/Settings/Profile";
import ProfileEdit from "./screens/Settings/Profile-Edit";
import Data from "./screens/Settings/Data";
import Accessibility from "./screens/Settings/Accessibility";
import Security from "./screens/Settings/Security";
import Support from "./screens/Settings/Support";

import Login from "./screens/Login";
import Signup from "./screens/SignUp";
import Home from "./screens/Home";
import ChatBot from "./components/ChatBot";
import Roadmap from "./screens/Roadmap";
import Subtask from "./screens/subtask";

import OnboardingQuiz from "./components/OnboardingQuiz";

function App() {
  //TEST
  const fetchAPI = async () => {
    await fetch("http://localhost:3000/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("womp womp");
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  //END TEST

  const location = useLocation();
  const hideNavBarRoutes = ["/", "/signup", "/quiz"]; 
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavBar && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/subtask" element={<Subtask />} />
        <Route path="/chatBot" element={<ChatBot />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/data" element={<Data />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/security" element={<Security />} />
        <Route path="/support" element={<Support />} />
        <Route path="/quiz" element={<OnboardingQuiz />} />
      </Routes>
    </>
  );
}

export default App;
