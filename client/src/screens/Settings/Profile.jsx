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
          
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
