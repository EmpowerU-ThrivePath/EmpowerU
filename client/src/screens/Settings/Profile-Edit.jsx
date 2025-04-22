import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, Outlet } from "react-router";

import SettingsMenu from "../../components/SettingsMenu";

const ProfileEdit = () => {
  const [avatar, setAvatar] = useState(false);
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
            <button className="edit-photo" onClick={toggleAvatar}>
              Edit photo
            </button>
            {avatar && (
              <div className="avatar-overlay">
                <div className="choose-avatar">
                  <h3>Select Your Avatar</h3>
                  <div className="avatars">
                    <img src="\Avatar 5.png" className="choose-avatar-pfp" />
                    <img src="\Avatar 5.png" className="choose-avatar-pfp" />
                    <img src="\Avatar 5.png" className="choose-avatar-pfp" />
                    <img src="\Avatar 5.png" className="choose-avatar-pfp" />
                    <img src="\Avatar 5.png" className="choose-avatar-pfp" />
                  </div>
                  <button className="choose-avatar-save" onClick={toggleAvatar}>
                    Save
                  </button>
                </div>
              </div>
            )}
            <p>Remove</p>
          </div>
          <form>
            <div className="edit-profile-info-text">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fname">First name</label>
                  <input type="text" id="fname" />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last name</label>
                  <input type="text" id="lname" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pronouns">Pronouns</label>
                  <input type="text" id="pronouns" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="grad-m">Graduation month</label>
                  <input type="text" id="grad-m" />
                </div>
                <div className="form-group">
                  <label htmlFor="grad-yr">Graduation year</label>
                  <input type="text" id="grad-yr" />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job">Intended Career</label>
                <input type="text" id="job" />
              </div>
            </div>
            <input className="save" type="submit" value="Save" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileEdit;
