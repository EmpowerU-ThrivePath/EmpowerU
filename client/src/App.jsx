import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
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
import TakeQuiz from "./components/TakeQuiz";

function App() {
  const [user, setUser] = useState(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  const location = useLocation();
  const hideNavBarRoutes = ["/", "/signup", "/quiz"];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/login/loggedin", {
          credentials: "include",
        });
        const data = await res.json();
        console.log("Session data:", data);
        setIsLoggedIn(data.loggedIn);
        if (data.userId) {
          setUser(data.userId);
          setHasCompletedQuiz(data.hasCompletedQuiz === true);
        }
      } catch (error) {
        console.error("error loading user info", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const PrivateRoute = ({ children }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!isLoggedIn) {
      return <Navigate to="/" />;
    }

    // Only redirect to quiz if not already on quiz page and hasn't completed it
    if (hasCompletedQuiz !== true && !location.pathname.startsWith('/quiz/')) {
      console.log("Redirecting to quiz, hasCompletedQuiz:", hasCompletedQuiz);
      return <Navigate to="/quiz/onboarding-quiz" />;
    }

    return children;
  };

  return (
    <>
      {!shouldHideNavBar && (
        <NavBar user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
      )}
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" />
            ) : (
              <Login setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
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
              <Profile user={user} setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/edit"
          element={
            <PrivateRoute>
              <ProfileEdit user={user} />
            </PrivateRoute>
          }
        />
        <Route path="/data" element={<Data />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route
          path="/security"
          element={
            <Security
              user={user}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/data"
          element={
            <Data user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/security"
          element={
            <Security
              user={user}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route path="/support" element={<Support />} />
        <Route path="/quiz/:slug" element={<TakeQuiz />} />
      </Routes>
    </>
  );
}

export default App;
