import React from 'react'

const Subtask = () => {
    return (
        <>
        <div className='subtask-div'>
            <p className='back-btn'>&lt; Back</p>
            
            <div className='progress-bar'>
            </div>

            <div className='subtask-content'>
                <p className='home-heading'><b>Add name & personal info</b></p>
                <p>Your name and personal information are the first things employers will see on your resume. This section is crucial because it allows potential employers to contact you for interviews or follow-ups. Make sure your your information is accurate, professional, and up to date.</p>
                <p>
                    This should Include:
                    <ul>
                        <li>Full name</li>
                        <li>Position</li>
                        <li>Location</li>
                        <li>Email</li>
                        <li>Phone number</li>
                        <li>Additional links</li>
                    </ul>
                </p>
            </div>

            <p><b>Example</b></p>
            <div className='example-div'></div>

            <p><b>Tips for succes</b>s</p>

            <div className='all-tips'>
                <div className='tip'>
                    <img className='tip-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png'></img>
                    <p><b>Include your LinkedIn/portfolio</b></p>
                    <p>Add links to your LinkedIn or portfolio to showcase your work</p>
                </div>

                <div className='tip'>
                    <img className='tip-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png'></img>
                    <p><b>Include your LinkedIn/portfolio</b></p>
                    <p>Add links to your LinkedIn or portfolio to showcase your work</p>
                </div>

                <div className='tip'>
                    <img className='tip-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png'></img>
                    <p><b>Include your LinkedIn/portfolio</b></p>
                    <p>Add links to your LinkedIn or portfolio to showcase your work</p>
                </div>
            </div>
           
           <p><b>Resources</b></p>
           <div className='resource-div'>
                <div className='resource'>
                    <p>Free Resume Examples and Samples for 2025</p>
                </div>

                <div className='resource'>
                    <p>Free Resume Examples and Samples for 2025</p>
                </div>
           </div>
           
        </div>
        </>
    )
}

export default Subtask