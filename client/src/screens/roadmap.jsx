import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import CompletionModal from "../components/CompletionModal";

const Roadmap = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { moduleId, user } = location.state;
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  console.log("Opening " + moduleId);
  console.log("User ID:", user._id);

  const [moduleData, setModuleData] = useState(null);
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    const fetchModuleData = async () => {
      try {
        const response = await fetch("/Dashboard/modules.json");
        if (!response.ok) {
          throw new Error('Failed to fetch module data');
        }
        const data = await response.json();
        const selectedModule = data[moduleId.toLowerCase()];
        setModuleData(selectedModule);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    fetchModuleData();
  }, [moduleId]);

  useEffect(() => {
    if (!moduleData) return;

    const task = user.subtasksInProgress?.[moduleId.toLowerCase()];
    console.log("Current task:", task);

    if (task) {
      setTaskId(task);
    } else {
      const firstTask = Object.keys(moduleData.subtasks)[0];
      const updateSubtask = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/addSubtaskInProgress`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              userId: user._id, 
              moduleId: moduleId.toLowerCase(), 
              taskId: firstTask 
            }),
          });

          if (!response.ok) {
            throw new Error('Failed to update subtask');
          }

          const data = await response.json();
          if (data.success) {
            // Update the user object in location state to reflect the new subtask
            location.state.user.subtasksInProgress = data.subtasksInProgress;
            setTaskId(firstTask);
          } else {
            console.error("Failed to add subtask:", data.error);
          }
        } catch (error) {
          console.error("Error updating subtask:", error);
        }
      };

      updateSubtask();
    }
  }, [moduleData, moduleId, user._id, location.key]);

  if (!moduleData) {
    return <div>Loading roadmap...</div>;
  }

  const taskKey = user.subtasksInProgress?.[moduleId.toLowerCase()];
  const currentTask = taskKey && moduleData?.subtasks?.[taskKey];

  console.log("Current task:", currentTask);
  console.log("Task key:", taskKey);

  const handleBackClick = () => {
    navigate('/home');
  };

  const handleContinueClick = () => {
    navigate('/subtask', { state: { moduleId, user, taskId } });
  };

  const handleCompleteModule = () => {
    setShowCompletionModal(true);
  };

  return (
    <>
      {showCompletionModal ? (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000
        }}>
          <CompletionModal />
        </div>
      ) : (
        <div className="flex-container">
          <div className="item1">
            <p className="back-btn" onClick={() => handleBackClick()}>
              &lt; Back
            </p>
            <div className="module-info">
              <div className="module-content">
                <p className="home-heading">
                  <b> {moduleId} </b>
                </p>
                <p> {moduleData["description"]} </p>
                <div className="module-status-div">
                  <p>In progress</p>
                </div>
                <p className="task-count">
                  📓 <span className="num-articles">5</span> subtasks
                </p>
              </div>
            </div>
            <div className="quiz-link">
              <p style={{ marginLeft: '10px' }}>
                Dont know where to start? Take our{" "}
                <Link to="../quiz/resume-quiz" style={{ color: '#095C13', fontWeight: 'bold' }}>quiz!</Link>
              </p>
            </div>  
            <div className="next-task">
              <div className="next-task-content">
                <p className="module-name">
                  <b>{ currentTask?.task_title }</b>
                </p>
                <p>{ currentTask?.short_desc }</p>

                <div className="next-task-button-div">
                  <div
                    className="module-button-div"
                    onClick={() => handleContinueClick()}
                  >
                    <p>Start task</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="roadmap-steps">
            {moduleData && Object.entries(moduleData.subtasks).map(([currentTask, taskData]) => {
              // Get all subtask keys
              const allKeys = Object.keys(moduleData.subtasks);
              
              // Get the current task's index
              const currentTaskIndex = allKeys.indexOf(currentTask);
              
              // Get the user's current task index
              const userCurrentTaskIndex = allKeys.indexOf(taskId);
              
              // A step is completed if its index is less than or equal to the user's current task index
              const isCompleted = currentTaskIndex <= userCurrentTaskIndex;
              
              // A step is the last completed if it's the current task
              const isLastCompleted = currentTaskIndex === userCurrentTaskIndex;

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
              );
            })}
          </div>

          <div className="item3" onClick={handleCompleteModule}>
            <p>Complete Module</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Roadmap;