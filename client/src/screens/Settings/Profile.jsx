import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, Outlet } from 'react-router'

import SettingsMenu from "../../components/SettingsMenu";
import ProfileEdit from "./Profile-Edit";

const Profile = ({ user }) => {
  const [userProfile, setUserProfile] = useState({
    fname: "",
    lname: "",
    pronouns: "",
    email: "",
    grad_month: "",
    grad_year: "",
    intended_career: "",
    avatar: ""
  })

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user?userId=${user}`)
      .then((res) => res.json())
      .then((data) => {
        setUserProfile(data)
      })
      .catch((error) => {
        console.error("error loading user info")
      })
  }


  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Your Profile</h2>
        <div className="profile-info">
          <div className="profile-info-pic">
            <img src={userProfile.avatar} className="profile-info-pfp"></img>
          </div>
          <div className="profile-info-text">
            <div className="profile-info-text-header">
              <h3>{userProfile.fname} {userProfile.lname}</h3>
              <p>{userProfile.pronouns}</p>
            </div>
            <div className="profile-info-text-personal">
              <h4>Current Graduation Date</h4>
              <p>{userProfile.grad_month} {userProfile.grad_year}</p>
              <h4>Intended Career</h4>
              <p>{userProfile.intended_career}</p>
              <h4>Email</h4>
              <p>{userProfile.email}</p>
              <h4>Next Step Navigator Result:</h4>
              <p>{userProfile.onboardingResultText || "Not completed yet"}</p>
            </div>
          </div>
          <div className='profile-info-edit'>
            <Link to="/profile/edit"><img src="\edit 1.png" className="profile-info-edit-icon"></img></Link>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Profile;
