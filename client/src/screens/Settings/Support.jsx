import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import SettingsMenu from "../../components/SettingsMenu";

const Support = () => {
  const [message, setMessage] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log("sending this message", message)

    if (!message.name || !message.email || !message.message) {
      alert("Please fill in all neccessary information!");
    } else {

      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/settings/message`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify((message))
        });

        if (response.ok) {
          // console.log("message sent")
          setMessage({
            name: '',
            email: '',
            message: ''
          })
        } else {
          alert(data.message || 'Invalid');
        }
      } catch (error) {
        console.error("Error", error);
        alert("An error occurred");
      }
    }
  }




  return (
    <div className="settings">
      <SettingsMenu />
      <div className="profile">
        <h2>Support</h2>
        <p>Need help? We’re here for you! </p>
        <div className="password-change">
          <h3>Contact Support</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="contact-name">Name</label>
              <input type="text" id="contact-name" name="name" value={message.name}
                    onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Email</label>
              <input type="text" id="contact-email" name="email"value={message.email}
                    onChange={handleChange}/>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="message" type="text" id="message" name="message" value={message.message}
                    onChange={handleChange}/>
            </div>
            <input className="password-submit" type="submit" value="Send" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Support;
