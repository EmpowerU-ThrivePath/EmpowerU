import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Subtask = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Users current task
    const taskId = location.state?.taskId;
    const moduleId = location.state?.moduleId;

    // all subtasks
    const [subtasks, setSubtasks] = useState(null);
    
    // Current users all completed subtasks
    const [completedSubtasks, setCompleted] = useState(null);
    
    useEffect(() => {
        // api call get users current compelted tasks
        setCompleted(["Personal_Information"]);
    }, []);
    
    useEffect(() => {
        fetch('/Dashboard/modules.json')
            .then(response => response.json())
            .then((data) => {
                const selectedModule = data[moduleId.toLowerCase()];
                setSubtasks(selectedModule.subtasks);
            })
            .catch(error => console.error('Error fetching modules:', error));
    });

    const currentTask = subtasks?.[taskId];

    // Need to pass the module name for back button 
    const handleBackClick = () => {
        navigate('/roadmap', { state: { moduleId } });
    };
    
    return (
        <>
        <div className='subtask-div'>
            <p className='back-btn' onClick={() => handleBackClick()}>&lt; Back</p>
            
            <div className='progress-bar'>    
                {subtasks && Object.entries(subtasks).map(([key, task], index) => (
                <div className='progress-circle-div' key={key}>
                    <div className={`progress-circle progress-circle-inprogress`}>
                    {task.task === 0 && (
                        <img
                        className='inprogress-dot'
                        src='https://onedaycolor.com/cdn/shop/products/GPCX4030_650x.png?v=1533739257'
                        alt='dot'
                        />
                    )}
                    </div>
                    <p className='progress-name'>{key.replace(/_/g, ' ')}</p>
                </div>
                ))}
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
                            <div className='tip'>
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
                            <div className='resource'>
                                <p><a href={resource.resource_link} target='_blank'>{resource.resource_title}</a></p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
        </>
    )
}

export default Subtask