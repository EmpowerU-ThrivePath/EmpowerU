import { React, useState, useEffect } from "react";
import { Link } from "react-router";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const toggleDropDown = () => {
    setOpen(!open);
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
          <Link to="/quiz" className="tab">
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
                  <Link to="/" className="drop-down-tab" onClick={toggleDropDown}><li>Log out</li></Link>
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
