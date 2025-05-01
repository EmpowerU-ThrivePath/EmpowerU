import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const [modulesData, setModulesData] = useState(null);
    let modulesArray = [];

    useEffect(() => {
        fetch('/Dashboard/modules.json')
          .then(response => response.json())
          .then((data) => {
            modulesArray = Object.values(data); 
            setModulesData(modulesArray);
          })
          .catch(error => console.error('Error fetching modules:', error));
    }, []);

    console.log(modulesData);

    const handleContinueClick = () => {
        console.log('Continue clicked');
        navigate('/roadmap');
        //navigate('/roadmap', { state: { moduleName } });
    };

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
                        <div className='module-button-div' onClick={() => handleContinueClick()}>
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
                    <p className='module-name'><b>Portfolio</b></p>
                    <div className='module-status-div module-status-coming-soon'>
                        <p>Coming soon</p>
                    </div>
                    <div className='home-button-div'>
                        <div className='module-button-div module-button-hidden'>
                            <p>Continue</p>
                        </div>
                    </div>
                    
                </div>
                <div className='module-img'>
                    <img src='https://png.pngtree.com/png-clipart/20220924/ourmid/pngtree-document-portfolio-png-image_6215067.png'></img>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home