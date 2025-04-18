import React from "react";
import ReactDOM from "react-dom/client";

import SettingsMenu from "../../components/SettingsMenu";

const Support = () => {
  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Support</h2>
        <p>Need help? We’re here for you! </p>
        <div className="password-change">
          <h3>Contact Support</h3>
          <p>Change password: Update your password to keep your account secure.</p>
        <form>
        <label for="contact-name">Name</label>
        <input type="text" id="contact-name" />
        <label for="contact-email">Email</label>
        <input type="text" id="contact-email" />
        <label for="message">Message</label>
        <input type="text" id="message" />
        <input type="submit" value="Send" />
        </form>
        </div>
      </div>
    </div>
  );
};

export default Support;