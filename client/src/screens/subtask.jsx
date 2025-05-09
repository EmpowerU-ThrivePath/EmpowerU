import React from 'react'
import {useNavigate} from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const Subtask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const taskId = location.state?.taskId;
    console.log("Opening " + taskId);

    let moduleId = "Resume";

    // Need to pass the module name for back button 
    const handleBackClick = () => {
        navigate('/roadmap', { state: { moduleId } });
    };
    
    return (
        <>
        <div className='subtask-div'>
            <p className='back-btn' onClick={() => handleBackClick()}>&lt; Back</p>
            
            <div className='progress-bar'>
                <div className='progress-circle-div'>
                    <div className='progress-circle progress-circle-inprogress'>
                        <img className='inprogress-dot' src='https://onedaycolor.com/cdn/shop/products/GPCX4030_650x.png?v=1533739257'></img>
                    </div>
                    <p className='progress-name'>Personal information</p>
                </div>

                <div className='progress-circle-div'>
                    <div className='progress-circle progress-circle-incomplete'></div>
                    <p className='progress-name'>Education</p>
                </div>

                <div className='progress-circle-div'>
                    <div className='progress-circle progress-circle-incomplete'></div>
                    <p className='progress-name'>Experience</p>
                </div>

                <div className='progress-circle-div'>
                    <div className='progress-circle progress-circle-incomplete'></div>
                    <p className='progress-name'>Skills</p>
                </div>

                <div className='progress-circle-div'>
                    <div className='progress-circle progress-circle-incomplete'></div>
                    <p className='progress-name'>Proofread</p>
                </div>
            </div>

            <div className='subtask-content'>
                <p className='home-heading'><b>Add name & personal info</b></p>
                <p>Your name and personal information are the first things employers will see on your resume. This section is crucial because it allows potential employers to contact you for interviews or follow-ups. Make sure your your information is accurate, professional, and up to date.</p>

                <p>This should Include: </p>
                <ul>
                    <li>Full name</li>
                    <li>Position</li>
                    <li>Location</li>
                    <li>Email</li>
                    <li>Phone number</li>
                    <li>Additional links</li>
                </ul>

            </div>

           <p className='thirty-px'><b>Example</b></p>
            <div className='example-div'>
                <img className='example-img' src='https://www.cvplaza.com/wp-content/uploads/2012/09/cv-personal-profile-statement.png'></img>
            </div>

            <p className='thirty-px'><b>Tips for success</b></p>
            <div className='all-tips'>
                <div className='tip'>
                    <img className='tip-img' src='https://www.designyup.com/wp-content/uploads/2019/03/arial-font-sample.jpg'></img>
                    <p><b>Use a clear, readable font</b></p>
                    <p>Choose a professional font to ensure your name and contact info are easy to read</p>
                </div>

                <div className='tip'>
                    <img className='tip-img' src='https://pictarts.com/07/material/01-free/0054-clip-art-m.png'></img>
                    <p><b>Have a professional email</b></p>
                    <p>Use a simple, name-based email instead of a casual or outdated address</p>
                </div>

                <div className='tip'>
                    <img className='tip-img' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png'></img>
                    <p><b>Include your LinkedIn/portfolio</b></p>
                    <p>Add links to your LinkedIn or portfolio to showcase your work</p>
                </div>
            </div>
           
           <p className='thirty-px'><b>Resources</b></p>
           <div className='resource-div'>
                <div className='resource'>
                    <p><a href='https://www.indeed.com/career-advice/resumes-cover-letters/personal-details-on-resume' target='_blank'>Including Personal Details on Your Resume</a></p>
                </div>

                <div className='resource'>
                    <p><a href='https://resume.io/blog/resume-personal-statement' target='_blank'>How to Write a Resume Personal Statement</a></p>
                </div>
           </div>
           
        </div>
        </>
    )
}

export default Subtask