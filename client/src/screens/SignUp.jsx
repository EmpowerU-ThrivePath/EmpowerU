import { set } from 'mongoose';
import React, { useState } from 'react'
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate()

    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
        pronouns: '',
        email: '',
        grad_year: '',
        intended_career: '',
        password: '',
        avatar: '\Avatar 1.png'
    })

    const handleChange = (event) => {
        setProfile({...profile, [event.target.name]: event.target.value})
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("Sending profile data:", profile)
        if (!profile.fname || !profile.lname || !profile.email || !profile.password) {
            alert("Please fill out all fields")
        } else if (!profile.email.includes("@")) {
            alert("Please enter valid email")
        } else if (profile.password.length < 8) {
            alert("Password must contain at least 8 characters")
        } else {
            try {
            console.log("Sending profile data:", profile)
            const response = await fetch('http://localhost:3000/api/login/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profile)
            })
            if (response.ok) {
                console.log("profile created")
                setProfile({
                    fname: '',
                    lname: '',
                    pronouns: '',
                    email: '',
                    grad_year: '',
                    intended_career: '',
                    password: '',
                    avatar: '\Avatar 1.png'
                })
                navigate("/")
            } else {
                throw new Error('Profile could not be saved');
            }

            } catch (error) {
                console.error('Error:', error);
                alert("Whoops! Profile could not be made.")
            }
            }
        }
        
    

    return (
        <div className='login'>
            <div className='login-left'>
                <div className='login-header'>
                    <img src="\ThrivePath.png" className="logo" alt="ThrivePath"></img>
                </div>
                <div className='login-left-text'>
                    <h2>Create Your Account</h2>
                    <form onSubmit={handleSubmit}>
                    <div className="form-group">
                            <label for="full-name-login">First name</label>
                            <input type="text" id="first-login" name="fname" value={profile.first}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="full-name-login">Last name</label>
                            <input type="text" id="last-login" name="lname" value={profile.last}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="email-login">Email</label>
                            <input type="text" id="email-login" name="email" value={profile.email}
                            onChange={handleChange}/>
                        </div>
                        <div className="form-group">
                            <label for="password-login">Password</label>
                            <input type="password" id="password-login" name="password" value={profile.password}
                            onChange={handleChange}/>
                        </div>
                        <input type="submit" value="Sign Up" className='signup-submit' />
                    </form>
                    <p>Already have an account? <Link to="/" class="signup-link">Log In</Link></p>
                </div>
            </div>
            <div className='login-right'>
                <div className='login-right-text'>
                    <h2>Helping students in tech feel like they belong.</h2>
                    <p>Think of us as your personal mentor. Share your journey, and we’ll provide the guidance and tools to help you reach your goals with confidence.</p>
                </div>
            </div>
        </div>
    )
}

export default Signup