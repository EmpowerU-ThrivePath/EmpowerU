import React, { useState } from 'react';
import { Link, useParams } from "react-router";
import { useNavigate } from "react-router-dom";

const Login = ({ setHasTakenQuiz, setUser, setIsLoggedIn }) => {


    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event) => {
        setLoginInfo({ ...loginInfo, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // console.log("sending this login info", loginInfo)

        if (!loginInfo.email || !loginInfo.password) {
            alert("Please fill in both email and password!");
        } else {

            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/login`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify((loginInfo))
                });

                if (response.ok) {
                    const data = await response.json()
                    // console.log("this is user at login", data.userId)
                    // console.log("this is quiz status from data", data.hasCompletedQuiz)

                    if (data.hasCompletedQuiz) {
                        // console.log("going home!")
                        navigate("/home")
                    } else {
                        // console.log("going 2 quiz!")
                        navigate("/quiz/onboarding-quiz")
                    }

                    setUser(data.userId)
                    setIsLoggedIn(true)
                    setHasTakenQuiz(data.hasCompletedQuiz)

            } else {

                alert(data.message || 'Invalid username or password.');
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred during login.");
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
                <h2>Welcome Back!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email-login">Email</label>
                        <input type="text" id="email-login" name="email" value={loginInfo.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password-login">Password</label>
                        <input type="password" id="password-login" name="password" value={loginInfo.password} onChange={handleChange} />
                    </div>
                    <input type="submit" value="Log In" className='login-submit' />
                </form>
                <p>Don't have an account? <Link to="/signup" className="signup-link">Sign Up</Link></p>
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

export default Login