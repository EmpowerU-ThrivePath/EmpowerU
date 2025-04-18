import React from 'react'

const Home = () => {
    return (
        <>
        <div className='home-header'>
            <p className='home-heading'><b>Good morning, <span>User!</span></b></p>
            <p className='home-text'>Let’s begin working on your journey.</p>
        </div>

        <div className='all-modules-div'>
            <div className='module'>
                <div className='module-content'>
                    <p className='module-name'><b>Resume</b></p>
                    <div className='module-status-div'>
                        <p>In progress</p>
                    </div>
                    <div className='home-button-div'>
                        <div className='module-button-div'>
                            <p>Continue</p>
                        </div>
                    </div>
                    
                </div>
                <div className='module-img'>
                    <img src='https://media.istockphoto.com/id/1304527612/vector/resumes-cv-application-resume-filling-concept-writing-business-resume-job-search-resume.jpg?s=612x612&w=0&k=20&c=wKhHHikcoQJ1pEGaOgSUWsRoXEYr1TTbvbHcrpm1zGo='></img>
                </div>
            </div>

            <div className='module'>
                <div className='module-content'>
                    <p className='module-name'><b>Module Name</b></p>
                    <div className='module-status-div'>
                        <p>User's Status</p>
                    </div>
                    <div className='home-button-div'>
                        <div className='module-button-div'>
                            <p>Continue</p>
                        </div>
                    </div>
                    
                </div>
                <div className='module-img'>
                    <img src='https://png.pngtree.com/element_our/20190530/ourmid/pngtree-white-spot-float-image_1256405.jpg'></img>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home