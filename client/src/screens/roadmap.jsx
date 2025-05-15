import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Roadmap = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const moduleId = location.state?.moduleId;
  console.log("Opening " + moduleId);

  const [moduleData, setModuleData] = useState(null);

  useEffect(() => {
    fetch("/Dashboard/modules.json")
      .then((response) => response.json())
      .then((data) => {
        const selectedModule = data[moduleId.toLowerCase()];
        setModuleData(selectedModule);
      })
      .catch((error) => console.error("Error fetching modules:", error));
  }, []);

  console.log(moduleData);

  if (!moduleData) {
    return <div>Loading roadmap...</div>;
  }

  const handleBackClick = () => {
    navigate("/home");
  };

  const handleContinueClick = () => {
    console.log("Continue clicked");
    navigate("/subtask");
    //navigate('/subtask', { state: { taskName } });
  };

  return (
    <>
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
                📓 <span className="num-articles">5</span> articles
              </p>
            </div>
          </div>

          <div className="next-task">
            <div className="next-task-content">
              <p className="module-name">
                <b>Add name & personal info</b>
              </p>
              <p>
                Include your full name, phone number, email address, and
                additional links
              </p>

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

          <p>
            Dont know where to start? Take our{" "}
            <Link to="../quiz/resume-quiz">quiz!</Link>
          </p>
        </div>

        <div className="roadmap-steps">
          <div className="step">
            <div className="step-bubble green">
              <img
                className="bubble-img"
                src="https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-image-png-14.png"
              ></img>
            </div>
            <p>Add name and personal information</p>
          </div>

          <div className="step">
            <div className="step-bubble"></div>
            <p>Add education</p>
          </div>

          <div className="step">
            <div className="step-bubble"></div>
            <p>List work experience/projects</p>
          </div>

          <div className="step">
            <div className="step-bubble"></div>
            <p>Add skills</p>
          </div>
        </div>

        <div className="item3">
          <p>Complete module</p>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
