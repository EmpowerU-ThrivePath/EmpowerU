import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { useNavigate } from "react-router-dom";

import SettingsMenu from "../../components/SettingsMenu";

const Security = ({user, setUser, setIsLoggedIn}) => {
  const navigate = useNavigate()

  // console.log(user)

  const [passUpdate, setPassUpdate] = useState({
    userId: user,
    currentPass: '',
    newPass: '',
    confirmPass: ''
  })

  const handleChange = (event) => {
    setPassUpdate({ ...passUpdate, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()


    if (!passUpdate.currentPass || !passUpdate.newPass || !passUpdate.confirmPass) {
      alert("Please fill out all fields")
    } else if (passUpdate.newPass.length < 8) {
      alert("New password must contain at least 8 characters")
    } else if (passUpdate.newPass != passUpdate.confirmPass) {
      alert("Passwords do not match")
    } else {
      try {
        // console.log("Sending password data:", passUpdate)
        const response = await fetch('http://localhost:3000/api/login/update', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(passUpdate)
        })
        if (response.ok) {
          // console.log("passupdated")
          setPassUpdate({
            userId: user,
            currentPass: '',
            newPass: '',
            confirmPass: ''
          })

          try {
            const res = await fetch('http://localhost:3000/api/login/logout', {
              method: 'DELETE',
              credentials: 'include'
            })
      
            const data = await res.json()
            // console.log("Logout response:", data)
            setIsLoggedIn(false);
            setUser(null);
      
          } catch (error) {
            console.error("Logout failed:", error);
          }
          navigate("/")
        } else {
          throw new Error('Password could not be updated');
        }

      } catch (error) {
        console.error('Error:', error);
        alert("Password could not be updated")
      }

    }
  }


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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="currentPass">Current password</label>
              <input type="password" id="currentPass" name="currentPass" value={passUpdate.currentPass}
                onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="newPass">New password</label>
              <input type="password" id="newPass" name="newPass" value={passUpdate.newPass}
                onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="reNewPass">Re-type new password</label>
              <input type="password" id="reNewPass" name="confirmPass" value={passUpdate.confirmPass}
                onChange={handleChange} />
            </div>
            <input className="password-submit" type="submit" value="Change password" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Security;
