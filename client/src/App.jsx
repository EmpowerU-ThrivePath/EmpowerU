import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const PrivateRoute = ({ children }) => {
    return isLoggedIn ? children : <Navigate to="/" />;
  }

  const location = useLocation();
  const hideNavBarRoutes = ["/", "/signup", "/quiz"];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname)


  return (
    <>
      {!shouldHideNavBar && <NavBar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/subtask" element={<Subtask />} />
        <Route path="/chatBot" element={<ChatBot />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile user="68156b3fb834217290977fa2" />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <ProfileEdit user="68156b3fb834217290977fa2" />
            </PrivateRoute>
          }
        />
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
