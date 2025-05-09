import { React, useState, useEffect } from "react";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const NavBar = ({ setUser, setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const toggleDropDown = () => {
    setOpen(!open);
  };

  const signOut = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/login/logout", {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      console.log("Logout response:", data);
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/");
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-left">
          <img src="\ThrivePath.png" className="logo" alt="ThrivePath"></img>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-right">
          <Link to="/home" className="tab">
            Dashboard{" "}
          </Link>
          <Link to="/quiz/onboarding-quiz" className="tab">
            Next Step Navigator
          </Link>
          <div className="drop-down">
            <img
              src="\Avatar 5.png"
              className="pfp"
              alt="profile picture"
              onClick={toggleDropDown}
            ></img>
            {open && (
              <div className="drop-down-options">
                <ul>
                  <li>
                    <Link
                      to="/profile"
                      className="drop-down-tab"
                      onClick={toggleDropDown}
                    >
                      Profile
                    </Link>
                  </li>
                  <div
                    className="drop-down-tab"
                    onClick={() => {
                      toggleDropDown();
                      signOut();
                    }}
                  >
                    <li>Log out</li>
                  </div>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
