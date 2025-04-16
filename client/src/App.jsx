import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import NavBar from "./components/NavBar";
import ProfileSettings from "./screens/Settings/Profile";
import Login from "./screens/Login";
import Home from './screens/Home';
import Roadmap from './screens/Roadmap';
import Subtask from './screens/subtask';

function App() {
  const [count, setCount] = useState(0);

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

  return (
    <>
      <NavBar/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Roadmap" element={<Roadmap />} />
          <Route path="/Subtask" element={<Subtask />} />
          <Route path="/settings" element={<ProfileSettings />}>            
            <Route path="profile" element={<ProfileSettings/>} />
            <Route path="data" element={<ProfileSettings/>} />
            <Route path="accessibility" element={<ProfileSettings/>} />
            <Route path="security" element={<ProfileSettings/>} />
            <Route path="support" element={<ProfileSettings/>} />
          </Route>
        </Routes>
    </>
  );
}

export default App;
