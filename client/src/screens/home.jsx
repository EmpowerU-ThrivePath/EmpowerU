import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = (user) => {
    const navigate = useNavigate();

    const [modulesData, setModulesData] = useState(null);
    let modulesArray = [];

    const [currentUser, setCurrentUser] = useState({
        fname: "",
        modulesInProgress: [],
        modulesComplete: []
    });

    useEffect(() => {
        loadUserProfile();
    }, []);

    // Fetch current user data
    const loadUserProfile = async () => {
        await fetch(`http://localhost:3000/api/user?userId=${user.user}`)
          .then((res) => res.json())
          .then((data) => {
            setCurrentUser(data)
          })
          .catch((error) => {
            console.error(error)
        })
    }

    // Fetch all modules data
    useEffect(() => {
        fetch('/Dashboard/modules.json')
          .then(response => response.json())
          .then((data) => {
            modulesArray = Object.values(data); 
            setModulesData(modulesArray);
          })
          .catch(error => console.error('Error fetching modules:', error));
    }, []);

    // Handles click event for button moving onto roadmap
    // If a user clicks start, add the module to the user's modulesInProgress array
    const handleContinueClick = async (moduleId) => {
        // update user's modulesInProgress to add moduleId here
        const userId = user.user; 
        try {
            const response = await fetch('http://localhost:3000/api/user/addModuleInProgress', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ userId, moduleId }),
            });
    
            const data = await response.json();

            if (data.success) {
                navigate('/roadmap', { state: { moduleId, user } });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.log(error);
        }
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
                        : currentUser.modulesComplete.includes(module.id) ? 'module-status-coming-soon'
                        : currentUser.modulesInProgress.includes(module.id) ? '' : 'hidden'
                        }`}>
                        <p>{module.status !== 'Published' ? 'Coming soon' : (currentUser.modulesComplete.includes(module.id)) 
                        ? 'Completed' : (currentUser.modulesInProgress.includes(module.id) ? 'In Progress' : '') }</p>
                    </div>
                    <div className='home-button-div'>
                        <div className={`module-button-div ${module.status === 'Published' ? '' : 'hidden'}`} onClick={() => handleContinueClick(module.id)}>
                            <p>{currentUser.modulesInProgress.includes(module.id) ? 'Continue' : currentUser.modulesComplete.includes(module.id) ? 'Start Over' : 'Start'}</p>
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