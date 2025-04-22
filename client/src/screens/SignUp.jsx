import React from 'react'
import { Link } from "react-router";

const Signup = () => {
    return (
        <div className='login'>
            <div className='login-left'>
                <div className='login-header'>
                    <img src="\ThrivePath.png" className="logo" alt="ThrivePath"></img>
                </div>
                <div className='login-left-text'>
                    <h2>Create Your Account</h2>
                    <form>
                    <div className="form-group">
                            <label for="full-name-login">Full name</label>
                            <input type="text" id="full-name-login" />
                        </div>
                        <div className="form-group">
                            <label for="email-login">Email</label>
                            <input type="text" id="email-login" />
                        </div>
                        <div className="form-group">
                            <label for="password-login">Password</label>
                            <input type="text" id="password-login" />
                        </div>
                        <Link to="/quiz"><input type="submit" value="Sign Up" className='signup-submit' /></Link>
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