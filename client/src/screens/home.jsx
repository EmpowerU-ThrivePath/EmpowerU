import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = ({ user }) => {
    const navigate = useNavigate();
    const [modulesData, setModulesData] = useState([]);
    const [userName, setUserName] = useState('');
    const [currentUser, setCurrentUser] = useState({
        modulesInProgress: [],
        modulesComplete: []
    });

    useEffect(() => {
        // Fetch user profile data
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user?userId=${user}`);
                const data = await response.json();
                setUserName(data.fname);
                setCurrentUser(data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (user) {
            fetchUserProfile();
        }

        // Fetch modules data
        fetch('/Dashboard/modules.json')
          .then(response => response.json())
          .then((data) => {
            const modulesArray = Object.values(data);
            setModulesData(modulesArray);
          })
          .catch(error => console.error('Error fetching modules:', error));
    }, [user]);

    // Handles click event for button moving onto roadmap
    const handleContinueClick = async (moduleId) => {
        if (!currentUser._id) {
            console.error('User ID not available');
            return;
        }

        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/addModuleInProgress`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ userId: currentUser._id, moduleId }),
            });
    
            const data = await response.json();

            if (data.success) {
                navigate('/roadmap', { state: { moduleId, user: currentUser } });
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error('Error adding module to progress:', error);
        }
    };

    if(!modulesData.length) {
        return <div>Loading modules...</div>
    }

    return (
        <>
        <div className='home-header'>
            <p className='home-heading'><b>Good morning, <span>{userName}!</span></b></p>
            <p className='home-text'>Let's begin working on your journey.</p>
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