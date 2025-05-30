import { React, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Link, Outlet } from "react-router";
import { useNavigate } from "react-router-dom";

import SettingsMenu from "../../components/SettingsMenu";

const ProfileEdit = ({ user }) => {
  const navigate = useNavigate()

  const [chooseAvatar, setChooseAvatar] = useState(false);
  const toggleAvatar = () => {
    setChooseAvatar(!chooseAvatar);
  }

  const [profile, setProfile] = useState({
    _id: user.user,
    fname: '',
    lname: '',
    pronouns: '',
    email: '',
    grad_month: '',
    grad_year: '',
    intended_career: '',
    avatar: ''
  })

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user?userId=${user}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("this is what i got", data)
        setProfile(data)
      })
      .catch((error) => {
        console.error("error loading user info")
      })
  }

  const handleChange = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value })
  }

  const handleClick = (avatarNumber) => {
    const newAvatar = `Avatar ${avatarNumber}.png`
    setProfile({ ...profile, avatar: newAvatar })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // console.log("profile afterrr", profile)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/change`, {
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
          avatar: ''
        })
        navigate("/profile", { state: { refresh: true } })
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
            <img src={`/${profile.avatar}`} className="edit-profile-info-pfp" alt="profile pic"></img>
            <button className="edit-photo" onClick={toggleAvatar}>
              Edit photo
            </button>
            {chooseAvatar && (
              <div className="avatar-overlay">
                <div className="choose-avatar">
                  <h3>Select Your Avatar</h3>
                  <div className="avatars">
                    <img src="\Avatar 1.png" className="choose-avatar-pfp" onClick={() => handleClick(1)} />
                    <img src="\Avatar 2.png" className="choose-avatar-pfp" onClick={() => handleClick(2)} />
                    <img src="\Avatar 3.png" className="choose-avatar-pfp" onClick={() => handleClick(3)} />
                    <img src="\Avatar 4.png" className="choose-avatar-pfp" onClick={() => handleClick(4)} />
                    <img src="\Avatar 5.png" className="choose-avatar-pfp" onClick={() => handleClick(5)} />
                    <img src="\Avatar 6.png" className="choose-avatar-pfp" onClick={() => handleClick(6)} />
                  </div>
                  <button className="choose-avatar-save" onClick={toggleAvatar}>
                    Save
                  </button>
                </div>
              </div>
            )}
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
                  <input type="text" id="grad-month" />
                </div>
                <div className="form-group">
                  <label htmlFor="grad-yr">Graduation year</label>
                  <input type="text" id="grad-year" name="grad_year" value={profile.grad_year}
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
