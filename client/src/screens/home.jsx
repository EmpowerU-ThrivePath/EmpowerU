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
                <div className='moduleContent'>
                    <p className='moduleName'><b>Resume</b></p>
                    <div className='moduleStatusDiv'>
                        <p>In progress</p>
                    </div>
                    <div className='moduleButtonDiv'>
                        <p>Continue</p>
                    </div>
                </div>
                <div className='moduleImg'>
                    <img src='https://media.istockphoto.com/id/1304527612/vector/resumes-cv-application-resume-filling-concept-writing-business-resume-job-search-resume.jpg?s=612x612&w=0&k=20&c=wKhHHikcoQJ1pEGaOgSUWsRoXEYr1TTbvbHcrpm1zGo='></img>
                </div>
            </div>

            <div className='module'>
                <div className='moduleContent'>
                    <p className='moduleName'><b>Module Name</b></p>
                    <div className='moduleStatusDiv'>
                        <p>User's Status</p>
                    </div>
                    <div className='moduleButtonDiv'>
                        <p>Continue</p>
                    </div>
                </div>
                <div className='moduleImg'>
                    <img src='https://png.pngtree.com/element_our/20190530/ourmid/pngtree-white-spot-float-image_1256405.jpg'></img>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home