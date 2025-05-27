import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Roadmap = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { moduleId, user } = location.state;

    // all module data
    const [moduleData, setModuleData] = useState(null);

    // user's current task
    const [taskId, setTaskId] = useState(null); 
    
    // Fetch the user info using user.user
    const [currentUser, setCurrentUser] = useState({
        fname: "",
        modulesInProgress: [],
        modulesComplete: [],
        subtasksInProgress: {}
    });

    useEffect(() => {
        fetch(`http://localhost:3000/api/user?userId=${user.user}`, {credentials: 'include'})
          .then(r => r.json()).then(setCurrentUser);
    }, [location.key]);

    useEffect(() => {
        fetch('/Dashboard/modules.json')
          .then(r => r.json())
          .then(data => setModuleData(data[moduleId.toLowerCase()]))
          .catch(console.error);
    }, [moduleId]);

    // get users current task
    useEffect(() => {
        if (!currentUser || !moduleData) return;
    
        // check if there is a task the user already started in this module. returns taskId
        const task = currentUser.subtasksInProgress[moduleId];
    
        // if there is a task in progress, set taskId to that task
        if (task !== "") {
            setTaskId(task);
            return;
        } else {
            // pick the very first subtask key
            console.log("else block");
            const firstTask = Object.keys(moduleData.subtasks)[0];

            fetch('http://localhost:3000/api/user/addSubtaskInProgress', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: user.user, moduleId, taskId: firstTask }),
            })
            .then(r => r.json())
            .then(data => {
              if (data.success) {
                setCurrentUser(prev => ({
                    ...prev,
                    subtasksInProgress: data.subtasksInProgress
                }));
                setTaskId(firstTask);
              } else {
                console.error("Failed to add subtask:", data.error);
              }
            })
            .catch(console.error);
        } 
    }, [currentUser, moduleData]);

    if(!moduleData) {
        return <div>Loading roadmap...</div>
    }

    const taskKey = currentUser?.subtasksInProgress?.[moduleId];
    const currentTask = taskKey && moduleData?.subtasks?.[taskKey];

    const handleBackClick = () => {
        navigate('/home');
    };

    const handleContinueClick = () => {
        navigate('/subtask', { state: { moduleId, user, taskId } });
    };

    // move complete to subtask only
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
                {moduleData && Object.entries(moduleData.subtasks).map(([currentTask, taskData], index) => {
                    // all subtask names
                    const allKeys = moduleData ? Object.keys(moduleData.subtasks) : [];

                    // index of current task
                    const currentIndex = allKeys.indexOf(taskId);
                    console.log(taskId);

                    // current users all inProgress subtasks
                    const allProgress = allKeys.slice(0, currentIndex + 1); 

                    let isCompleted = allProgress.includes(currentTask);
                    let isLastCompleted = index === currentIndex;

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