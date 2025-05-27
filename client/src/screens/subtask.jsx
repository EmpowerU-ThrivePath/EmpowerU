import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Subtask = () => {
    const navigate = useNavigate();

    const { moduleId, user, taskId } = useLocation().state;
    let updatedUser = user;

    // all subtasks
    const [subtasks, setSubtasks] = useState(null);
    
    useEffect(() => {
        fetch('/Dashboard/modules.json')
            .then(response => response.json())
            .then((data) => {
                const selectedModule = data[moduleId.toLowerCase()];
                setSubtasks(selectedModule.subtasks);
            })
            .catch(error => console.error('Error fetching modules:', error));
    });

    const taskKeys = subtasks ? Object.keys(subtasks) : [];
    const currentIndex = taskKeys.indexOf(taskId);
    const lastSubtask = currentIndex === taskKeys.length - 1;
    const currentTask = subtasks?.[taskId];

    // Need to pass the module name for back button 
    const handleBackClick = () => {
        navigate('/roadmap', { state: { moduleId, user: updatedUser } });
    };

    // when the user clicks next, the next subtask is opened
    const handleNextClick = async () => {
        console.log("next clicked");
        if (lastSubtask) {
            navigate('/home');
        } else { 
            const nextTaskId = taskKeys[currentIndex + 1];
            
            try {
                const response = await fetch('http://localhost:3000/api/user/addSubtaskInProgress', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ userId: updatedUser.user, moduleId, taskId: nextTaskId}),
                });

                if (!response.ok) {
                    console.error("  Response not OK:", response.status, response.statusText);
                    return;
                }
    
                const data = await response.json();

                if (data.success) {
                    updatedUser = {
                        ...user,
                        subtasksInProgress: data.subtasksInProgress
                    };

                    navigate('/subtask', { state: { moduleId, user: updatedUser, taskId: nextTaskId } });
                } else {
                    alert(data.error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    // remove the current module from modulesInProgress and move to modulesComplete
    const handleCompleteClick = async () => {
        console.log("complete clicked");
        try {
            const response = await fetch ('http://localhost:3000/api/user/addModuleComplete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ userId: updatedUser.user, moduleId }),
            });

            if (!response.ok) {
                console.error("  Response not OK:", response.status, response.statusText);
                return;
            }

            const data = await response.json();

            if (data.success) {
                updatedUser = {
                    ...user,
                    modulesInProgress: data.modulesInProgress,
                    modulesComplete: data.modulesComplete
                };
            } else {
                alert(data.error);
            }
            navigate('/home');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <div className='subtask-div'>
            <p className='back-btn' onClick={() => handleBackClick()}>&lt; Back</p>
            
            <div className='progress-bar'>    
                {subtasks && Object.entries(subtasks).map(([key], index) => {                    
                    return(
                        <div className='progress-circle-div' key={key}>
                            <div className={`progress-circle progress-circle-inprogress`}>
                            {index == currentIndex && (
                                <img
                                className='inprogress-dot'
                                src='https://onedaycolor.com/cdn/shop/products/GPCX4030_650x.png?v=1533739257'
                                alt='dot'
                                />
                            )}
                            </div>
                            <p className='progress-name'>{key.replace(/_/g, ' ')}</p>
                        </div>
                    );
                })}
            </div>

            <div className='subtask-content'>
                <p className='home-heading'><b>{currentTask?.task_title}</b></p>

                {currentTask?.task_desc && Object.entries(currentTask.task_desc).map(([key, value], index) => {
                    if (key.includes("p")) {
                        return value.map((paragraph, i) => <p key={`p-${index}-${i}`}>{paragraph}</p>);
                    }

                    if (key.includes("ul")) {
                        return (
                          <ul key={`ul-${index}`}>
                            {value.map((item, i) => (
                              <li key={`li-${index}-${i}`}>{item}</li>
                            ))}
                          </ul>
                        );
                    }

                    if (key.includes("ol")) {
                        return (
                          <ol key={`ol-${index}`}>
                            {value.map((item, i) => (
                              <li key={`li-${index}-${i}`}>{item}</li>
                            ))}
                          </ol>
                        );
                    }
                    return null;
                })}

            </div>

            {currentTask?.example_img && (
                <>
                    <p className='thirty-px'><b>Example</b></p>
                    <div className='example-div'>
                    <img className='example-img' src={currentTask.example_img} alt='Example' />
                    </div>
                </>
            )}

            {currentTask?.tips && (
                <>
                    <p className='thirty-px'><b>Tips for success</b></p>
                    <div className='all-tips'>
                        {currentTask?.tips?.map((tip) => (
                            <div className='tip' key={tip.title}>
                                <img className='tip-img' src={tip.tip_img}></img>
                                <p><b>{tip.title}</b></p>
                                <p>{tip.caption}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {currentTask?.resources && (
                <>
                    <p className='thirty-px'><b>Resources</b></p>
                    <div className='resource-div'>
                        {currentTask?.resources?.map((resource) => (
                            <div className='resource' key={ resource.resource_title }>
                                <p><a href={resource.resource_link} target='_blank'>{resource.resource_title}</a></p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            <div className='item3' onClick={ lastSubtask ? handleCompleteClick : handleNextClick}>
                <p>{ lastSubtask ? "Complete module" : "Next" }</p>
            </div>
        </div>
        </>
    )
}

export default Subtask