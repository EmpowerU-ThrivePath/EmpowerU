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
import Home from "./screens/home";
import ChatBot from "./components/ChatBot";
import Roadmap from "./screens/roadmap";
import Subtask from "./screens/subtask";
import TakeQuiz from "./components/TakeQuiz";

function App() {
  const [user, setUser] = useState(null);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);
  const [hasTakenQuiz, setHasTakenQuiz] = useState(false);

  const location = useLocation();
  const hideNavBarRoutes = ["/", "/signup", "/quiz/onboarding-quiz"];
  const shouldHideNavBar = hideNavBarRoutes.includes(location.pathname);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login/loggedin`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log("Session data:", data);
        setIsLoggedIn(data.loggedIn);
        if (data.userId) {
          setUser(data.userId);
          setHasTakenQuiz(data.hasCompletedQuiz);
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
    return children;
  }

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
              hasTakenQuiz ? (
                <Navigate to="/home" />
              ) : (
                <Navigate to="/quiz/onboarding-quiz" />
              )
            ) : (
              <Login
                setUser={setUser}
                setIsLoggedIn={setIsLoggedIn}
                setHasTakenQuiz={setHasTakenQuiz}
              />
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
        <Route path="/roadmap" element={<PrivateRoute><Roadmap /> </PrivateRoute>} />
        <Route path="/subtask" element={<PrivateRoute><Subtask /> </PrivateRoute>} />
        <Route path="/chatBot" element={<PrivateRoute><ChatBot /> </PrivateRoute>} />
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
        <Route path="/accessibility" element={<PrivateRoute> <Accessibility /> </PrivateRoute>} />

        <Route
          path="/data"
          element={
            <PrivateRoute><Data user={user} setUser={setUser} setIsLoggedIn={setIsLoggedIn} /></PrivateRoute>
          }
        />
        <Route
          path="/security"
          element={
            <PrivateRoute><Security
              user={user}
              setUser={setUser}
              setIsLoggedIn={setIsLoggedIn}
            /></PrivateRoute>
          }
        />
        <Route path="/support" element={<PrivateRoute><Support /> </PrivateRoute>} />
        <Route path="/quiz/:slug" element={<PrivateRoute><TakeQuiz userPass={user} setHasTakenQuiz={setHasTakenQuiz} /></PrivateRoute>} />
      </Routes>
    </>
  );
}

export default App;
