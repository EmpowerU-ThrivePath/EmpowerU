import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Roadmap = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // current module
    const moduleId = location.state?.moduleId;

    // current user
    const user = location.state?.user;
    
    // Fetch the user info using user.user
    const [currentUser, setCurrentUser] = useState({
        fname: "",
        modulesInProgress: [],
        modulesComplete: [],
        subtasksInProgress: []
    });
    
    useEffect(() => {
        loadUserProfile();
    }, []);

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

    const [moduleData, setModuleData] = useState(null);

    // user's current task
    const [taskId, setTaskId] = useState(null); 
    
    // api call get users current task
    useEffect(() => {
        setTaskId("Personal_Information");
    }, []);

    // need to create user's completed subtasks array that holds all completed subtasks
    // Current users all completed subtasks
    const subtasksComplete = ["Personal_Information"]; 

    // fetch data for current module
    useEffect(() => {
        fetch('/Dashboard/modules.json')
            .then(response => response.json())
            .then((data) => {
                const selectedModule = data[moduleId.toLowerCase()];
                setModuleData(selectedModule);
            })
            .catch(error => console.error('Error fetching modules:', error));
    });

    const currentTask = moduleData && taskId && moduleData.subtasks?.[taskId];

    if(!moduleData) {
        return <div>Loading roadmap...</div>
    }

    const handleBackClick = () => {
        navigate('/home');
    };

    const handleContinueClick = () => {
        navigate('/subtask', { state: { moduleId, taskId } });
    };

    const handleCompleteClick = async (moduleId) => {
        console.log(user.user);
        console.log(moduleId);
        console.log(user.modulesInProgress);
        // navigate('/home');
    }

    return (
        <>
        <div className='flex-container'>
            <div className='item1'>
            <p className='back-btn' onClick={() => handleBackClick()}>&lt; Back</p>
                <div className='module-info'>
                    <div className='module-content'>
                        <p className='home-heading'><b> {moduleId} </b></p>
                        <p> {moduleData["description"]} </p>
                        <div className='module-status-div'>
                            <p>In progress</p>
                        </div>
                        <p className='task-count'>📓 <span className='num-articles'>{moduleData?.subtasks ? Object.keys(moduleData.subtasks).length : 0}</span> articles</p>
                    </div>
                    
                </div>

                <div className='next-task'>
                    <div className='next-task-content'>
                        <p className='module-name'><b>{currentTask?.task_title}</b></p>
                        <p>{currentTask?.short_desc}</p>
                        
                        <div className='next-task-button-div'>
                            <div className='module-button-div' onClick={() => handleContinueClick()}>
                                <p>Start task</p>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            
            <div className='roadmap-steps'>
                {moduleData && Object.entries(moduleData.subtasks).map(([currentTask, taskData]) => {
                    let isCompleted = subtasksComplete.includes(currentTask);
                    
                    //let isCompleted = currentUser.subtasksComplete.includes(currentTask);
                    let isLastCompleted = isCompleted && currentTask === taskId;

                    // const taskKeys = subtasks ? Object.keys(subtasks) : [];
                    // const currentIndex = taskKeys.indexOf(taskId);
                    // const lastSubtask = currentIndex === taskKeys.length - 1;
                    // const currentTask = subtasks?.[taskId];
                    
                    // const completed = taskKeys.slice(0, currentIndex);
                    // const completed = ["Personal_Information", "Education"];
                    // let isCompleted = completed.includes(key);

                    return (
                        <div className='step' key={currentTask}>
                            <div className={`step-bubble ${isCompleted ? 'green' : ''}`}>
                            {isLastCompleted && (
                                <img
                                    className='bubble-img'
                                    src='https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-image-png-14.png'
                                    alt='arrow'
                                />
                            )}
                            </div>
                            <p>{taskData.task_title}</p>
                        </div>
                    )
                   
                })}
            </div>

            <div className='item3' onClick={() => handleCompleteClick(moduleId)}>
                <p>Complete module</p>
            </div>
        </div>
        </>
    )
}

export default Roadmap