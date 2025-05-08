import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

import SettingsMenu from "../../components/SettingsMenu";

const ProfileEdit = (user) => {
  const navigate = useNavigate()

  const [avatar, setAvatar] = useState(false);
  const toggleAvatar = () => {
    setAvatar(!avatar);
  }

  const [profile, setProfile] = useState({
    _id: user.user,
    fname: '',
    lname: '',
    pronouns: '',
    email: '',
    grad_year: '',
    intended_career: '',
  })

  useEffect(() => {
    loadUserProfile()
  }, [])

  const loadUserProfile = async () => {
    await fetch(`http://localhost:3000/api/user?userId=${user.user}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data)
      })
      .catch((error) => {
        console.error("error loading user info")
      })
  }

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`http://localhost:3000/api/user/change`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile)
      })
      if (response.ok) {
        setProfile({
          fname: '',
          lname: '',
          pronouns: '',
          email: '',
          grad_year: '',
          intended_career: '',
        })
        navigate("/profile")
      } else {
        throw new Error('Changes could not be saved');
      }

    } catch (error) {
      console.error('Error:', error);
      alert("Whoops! Changes could not be saved")
    }
  }



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
          <form onSubmit={handleSubmit}>
            <div className="edit-profile-info-text">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fname">First name</label>
                  <input type="text" id="fname" name="fname" value={profile.fname}
                    onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="lname">Last name</label>
                  <input type="text" id="lname" name="lname" value={profile.lname}
                    onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pronouns">Pronouns</label>
                  <input type="text" id="pronouns" name="pronouns" value={profile.pronouns}
                    onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="text" id="email" name="email" value={profile.email}
                    onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="grad-m">Graduation month</label>
                  <input type="text" id="grad-m" />
                </div>
                <div className="form-group">
                  <label htmlFor="grad-yr">Graduation year</label>
                  <input type="text" id="grad-yr" name="grad_year" value={profile.grad_year}
                    onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job">Intended Career</label>
                <input type="text" id="job" name="intended_career" value={profile.intended_career}
                  onChange={handleChange} />
              </div>
            </div>
            <input className="save" type="submit" value="Save" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default ProfileEdit;
