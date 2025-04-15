import React from 'react'

const Home = () => {
    return (
        <>
        <div>
            <p>Good morning, <span>User!</span></p>
            <p>Let’s begin working on your journey.</p>
        </div>

        <div className='allModulesDiv'>
            <div className='module'>
                <p>Resume</p>
                <p>In progress</p>
            </div>

            <div className='module'>
                <p>Resume</p>
                <p>In progress</p>
            </div>

            <div className='module'>
                <p>Module Name</p>
            </div>

            <div className='module'>
                <p>Module Name</p>
            </div>
        </div>
        </>
    )
}

export default Home