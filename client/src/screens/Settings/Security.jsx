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
          <p>
            <span className="slight-bold">Change password:</span> Update your password to keep your account secure.
          </p>
          <form>
            <div className="form-group">
              <label htmlFor="currentPass">Current password</label>
              <input type="password" id="currentPass" />
            </div>
            <div className="form-group">
              <label htmlFor="newPass">New password</label>
              <input type="password" id="newPass" />
            </div>
            <div className="form-group">
              <label htmlFor="reNewPass">Re-type new password</label>
              <input type="password" id="reNewPass" />
            </div>
            <input className="password-submit" type="submit" value="Change password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
