import React from "react";
import ReactDOM from "react-dom/client";

import SettingsMenu from "../../components/SettingsMenu";

const Data = () => {
  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Data and Privacy</h2>
        <p>At ThrivePath, we value your privacy and are committed to being transparent about how we use your data. </p>
        <div className="data-use">
        <h3>What we use your data for</h3>
        <p><b>Profile Customization:</b> Your account details, like your name, interests, and goals, help us personalize your profile and content recommendations to match your aspirations.</p>
        <p><b>Content & Learning Suggestions:</b> Based on your activity, we suggest relevant academic and career resources to guide you in your journey.</p>
        </div>
        <div className="data-ctrl">
          <h3>Data Control</h3>
          <p><b>Download My Data</b></p>
          <p>Request a copy of your account data, including saved content, interactions, and settings.</p>
          <br></br>
          <p><b>Delete My Account</b></p>
          <p>Permanently remove your profile and all associated data. (This action is irreversible.)</p>
        </div>
      </div>
    </div>
  );
};
export default Data;
