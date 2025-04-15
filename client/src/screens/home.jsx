import React from 'react'

const Home = () => {
    return (
        <>
        <div className='homeHeader'>
            <p className='homeHeading'><b>Good morning, <span>User!</span></b></p>
            <p className='homeText'>Let’s begin working on your journey.</p>
        </div>

        <div className='allModulesDiv'>
            <div className='module'>
                <p className='moduleName'><b>Resume</b></p>
                <div className='moduleStatusDiv'>
                    <p>In progress</p>
                </div>
                <div className='moduleButtonDiv'>
                    <p>Continue</p>
                </div>
            </div>

            <div className='module'>
                <p className='moduleName'><b>Resume</b></p>
                <div className='moduleStatusDiv'>
                    <p>In progress</p>
                </div>
                <div className='moduleButtonDiv'>
                    <p>Continue</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home