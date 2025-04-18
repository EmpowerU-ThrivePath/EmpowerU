import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, Outlet } from 'react-router'

import SettingsMenu from "../../components/SettingsMenu";

const ProfileEdit = () => {
  const [avatar, setAvatar] = useState(false)
  const toggleAvatar = () => {
    setAvatar(!avatar);
  };

  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Your Profile</h2>
        <div className="edit-profile-info">
          <div className="edit-profile-info-pic">
            <img src="\Avatar 5.png" className="edit-profile-info-pfp"></img>
            <button onClick={toggleAvatar}>Edit photo</button>
            {avatar && (
              <div className="choose-avatar">
                <img src="\Avatar 5.png" className="choose-avatar-pfp"></img>
                <img src="\Avatar 5.png" className="choose-avatar-pfp"></img>
                <img src="\Avatar 5.png" className="choose-avatar-pfp"></img>
                <img src="\Avatar 5.png" className="choose-avatar-pfp"></img>
                <img src="\Avatar 5.png" className="choose-avatar-pfp"></img>
                <button onClick={toggleAvatar}>Save</button>
              </div>
            )}
            <p>Remove</p>
          </div>
          <form>
            <div className="edit-profile-info-text">
              <label for="fname">First name</label>
              <input type="text" id="fname" />
              <label for="lname">Last name</label>
              <input type="text" id="lname" />
              <label for="pronouns">Pronouns</label>
              <input type="text" id="pronouns" />
              <label for="email">Email</label>
              <input type="text" id="email" />
              <label for="grad">Graduation year</label>
              <input type="text" id="grad" />
              <label for="job">Intended Career</label>
              <input type="text" id="job" />
            </div>
            <input type="submit" value="Save" />
          </form>
        </div>
      </div>
    </div>

  );
};

export default ProfileEdit;
