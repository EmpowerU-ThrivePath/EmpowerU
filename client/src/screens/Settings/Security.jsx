import React from "react";
import ReactDOM from "react-dom/client";

import SettingsMenu from "../../components/SettingsMenu";

const Security = () => {
  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Security</h2>
        <p>Your security is our priority.</p>
        <div className="password-change">
          <h3>Password</h3>
          <p>Change password: Update your password to keep your account secure.</p>
        <form>
        <label for="currentPass">Current password</label>
        <input type="text" id="currentPass" />
        <label for="newPass">New password</label>
        <input type="text" id="newPass" />
        <label for="reNewPass">Re-type new password</label>
        <input type="text" id="reNewPass" />
        <input type="submit" value="Change password" />
        </form>
        </div>
      </div>
    </div>
  );
};

export default Security;