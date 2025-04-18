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
        <p>Profile Customization: Your account details, like your name, interests, and goals, help us personalize your profile and content recommendations to match your aspirations.</p>
        <p>Content & Learning Suggestions: Based on your activity, we suggest relevant academic and career resources to guide you in your journey.</p>
        </div>
        <div className="data-ctrl">
          <h3>Data Control</h3>
          <p>Download My Data</p>
          <p>Request a copy of your account data, including saved content, interactions, and settings.</p>
          <p>Delete My Account</p>
          <p>Permanently remove your profile and all associated data. (This action is irreversible.)</p>
        </div>
      </div>
    </div>
  );
};
export default Data;
