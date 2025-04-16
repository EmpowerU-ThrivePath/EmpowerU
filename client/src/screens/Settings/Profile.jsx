import React from "react";
import ReactDOM from "react-dom/client";

import SettingsMenu from "../../components/SettingsMenu";

const ProfileSettings = () => {
  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Your Profile</h2>
        <div className="profile-info">
          <div className="profile-info-pic">
            <img src="\Avatar 5.png" className="profile-info-pfp"></img>
          </div>
          <div className="profile-info-text">
            <div className="profile-info-text-header">
              <h3>Jasmine Hernandez</h3>
              <p>she/her</p>
            </div>
            <div className="profile-info-text-personal">
              <h4>Current Graduation Date</h4>
              <p>December 2025</p>
              <h4>Intended Career</h4>
              <p>Software Engineer</p>
              <h4>Email</h4>
              <p>Jasminehernandez@gmail.com</p>
            </div>
          </div>
          <div className='profile-info-edit'>
            edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
