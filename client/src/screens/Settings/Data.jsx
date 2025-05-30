import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate, useLocation } from "react-router-dom";

import SettingsMenu from "../../components/SettingsMenu";

const Data = ({ user, setUser, setIsLoggedIn }) => {
  const navigate = useNavigate()
  // console.log("testing what user is at data", user)

  const deleteAcc = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user?userId=${user}`, {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data)
      })
      .catch((error) => {
        console.error("error loading user info")
      })
  }

  const signOut = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login/logout`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      // console.log("Logout response:", data);
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
    navigate("/");
  }

  const handleDelete = async (event) => {
    event.preventDefault()

    deleteAcc()
    signOut()
  }


  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Data and Privacy</h2>
        <p>At ThrivePath, we value your privacy and are committed to being transparent about how we use your data. </p>
        <div className="data-use">
          <h3>What we use your data for</h3>
          <p><span className="slight-bold">Profile Customization:</span> Your account details, like your name, interests, and goals, help us personalize your profile and content recommendations to match your aspirations.</p>
          <p><span className="slight-bold">Content & Learning Suggestions:</span> Based on your activity, we suggest relevant academic and career resources to guide you in your journey.</p>
        </div>
        <div className="data-ctrl">
          <h3>Data Control</h3>
          <p><span className="slight-bold">Delete My Account</span></p>
          <p>Permanently remove your profile and all associated data. (This action is irreversible.)</p>
          <button className="delete-acc" onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </div>
  );
};
export default Data;
