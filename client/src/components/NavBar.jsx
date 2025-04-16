import React from 'react'
import { Link } from 'react-router'

const NavBar = () => {
    return (
        <>
        <div className="navbar">
            <div className="navbar-left">
                <img src='\ThrivePath.png' className='logo' alt='ThrivePath'></img>
            </div>
            <div className='navbar-center'></div>
            <div className='navbar-right'>
                <Link to={"./Home"} className='tab'>Dashboard</Link>
                <Link to={"./Home"} className='tab'>Next Step Navigator</Link>
                <img src="\Avatar 5.png" className='pfp' alt='profile picture'></img>
            </div>
        </div>
        </>
    )
}

export default NavBar