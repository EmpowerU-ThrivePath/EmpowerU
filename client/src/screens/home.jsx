import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = (user) => {
    const navigate = useNavigate();

    const [modulesData, setModulesData] = useState(null);
    let modulesArray = [];

    // If module is in modulesInProgress, module-button text should be continue, if not, begin 
    const [modulesInProgress, setInProgress] = useState(null);

    // if module is in modulesComplete, module-button should be grey with text start over, with module-status-div
    // saying "completed"
    const [modulesComplete, setComplete] = useState(null);

    // if a user clicks start, add the module to the user's modulesInProgress array

    const [currentUser, setCurrentUser] = useState({
        fname: "",
        modulesInProgress: []
    });

    useEffect(() => {
        loadUserProfile();
        setInProgress(['resume']);
        setComplete([]);
    }, []);

    const loadUserProfile = async () => {
        await fetch(`http://localhost:3000/api/user?userId=${user.user}`)
          .then((res) => res.json())
          .then((data) => {
            setCurrentUser(data)
          })
          .catch((error) => {
            console.error("error loading user info")
        })
    }

    /* 
    const loadUserCurrentModules = async () => {
        await fetch(`http://localhost:3000/api/user?userId=${user.user}`)
          .then((res) => res.json())
          .then((data) => {
            setCurrentUser(data)
          })
          .catch((error) => {
            console.error("error loading user info")
        })
    }
    */

    useEffect(() => {
        fetch('/Dashboard/modules.json')
          .then(response => response.json())
          .then((data) => {
            modulesArray = Object.values(data); 
            setModulesData(modulesArray);
          })
          .catch(error => console.error('Error fetching modules:', error));
    }, []);

    const handleContinueClick = (moduleId) => {
        console.log('Clicked ' + moduleId);
        navigate('/roadmap', { state: { moduleId } });
    };

    if(!modulesData) {
        return <div>Loading modules...</div>
    }

    return (
        <>
        <div className='home-header'>
            <p className='home-heading'><b>Good morning, <span> {currentUser.fname}!</span></b></p>
            <p className='home-text'>Let’s begin working on your journey.</p>
        </div>

        <div className='all-modules-div'>
            {modulesData.map((module, index) => (
                <div className='module' key={index}>
                    <div className='module-content'>
                    <p className='module-name'><b>{ module.id }</b></p>
                    <div className={`module-status-div ${module.status !== 'Published' ? 'module-status-coming-soon'
                        : modulesComplete.includes(module.id.toLowerCase()) ? 'module-status-coming-soon'
                        : modulesInProgress.includes(module.id.toLowerCase()) ? '' : 'hidden'
                        }`}>
                        <p>{module.status !== 'Published' ? 'Coming soon' : (modulesComplete.includes(module.id.toLowerCase())) 
                        ? 'Completed' : (modulesInProgress.includes(module.id.toLowerCase()) ? 'In Progress' : '') }</p>
                    </div>
                    <div className='home-button-div'>
                        <div className={`module-button-div ${module.status === 'Published' ? '' : 'hidden'}`} onClick={() => handleContinueClick(module.id)}>
                            <p>{modulesInProgress.includes(module.id.toLowerCase()) ? 'Continue' : modulesComplete.includes(module.id.toLowerCase()) ? 'Start Over' : 'Start'}</p>
                        </div>
                    </div>
                    
                    </div>
                    <div className='module-img'>
                        <img src={ module.img } alt={`${module.id} module`}></img>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}

export default Home