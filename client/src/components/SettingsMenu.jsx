import React from 'react'
import { Link } from 'react-router'


/* 
TO DO:
- props pass in to highlight what page
*/
const SettingsMenu = () => {
    return (
            <div className="settings-menu">
                <h2>Settings</h2>
                <ul>
                    <Link to={"./Profile"} className="text-link"><li>Profile</li></Link>
                    <Link to={"./Profile"} className="text-link"><li>Data and Privacy</li></Link>
                    <Link to={"./Profile"} className="text-link"><li>Accessibility</li></Link>
                    <Link to={"./Profile"} className="text-link"><li>Security</li></Link>
                    <Link to={"./Profile"} className="text-link"><li>Support</li></Link>
                </ul>
            </div>
    )
}

export default SettingsMenu