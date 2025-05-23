import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const Home = ({ user }) => {
    const navigate = useNavigate();
    const [modulesData, setModulesData] = useState(null);
    const [userName, setUserName] = useState('');
    let modulesArray = [];

    useEffect(() => {
        // Fetch user profile data
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user?userId=${user}`);
                const data = await response.json();
                setUserName(data.fname);
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
            modulesArray = Object.values(data); 
            setModulesData(modulesArray);
          })
          .catch(error => console.error('Error fetching modules:', error));
    }, [user]);

    console.log(modulesData);

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
            <p className='home-heading'><b>Good morning, <span>{userName}!</span></b></p>
            <p className='home-text'>Let's begin working on your journey.</p>
        </div>

        <div className='all-modules-div'>
            {modulesData.map((module, index) => (
                <div className='module' key={index}>
                    <div className='module-content'>
                    <p className='module-name'><b>{ module.id }</b></p>
                    <div className={`module-status-div ${module.status === 'Published' ? '' : 'module-status-coming-soon'}`}>
                        <p>{module.status === 'Published' ? 'In Progress' : 'Coming Soon'}</p>
                    </div>
                    <div className='home-button-div'>
                        <div className={`module-button-div ${module.status === 'Published' ? '' : 'module-button-hidden'}`} onClick={() => handleContinueClick(module.id)}>
                            <p>Continue</p>
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