import React from 'react'

const Roadmap = () => {
    return (
        <>
        <p className='backBtn'>&lt; Back</p>
        
        <div className='flexContainer'>
            <div className='item1'>
                <div className='moduleInfo'>
                    <div className='moduleContent'>
                        <p className='homeHeading'><b>Module name</b></p>
                        <p>Build a professional resume step-by-step with our guided tool.</p>
                        <div className='moduleStatusDiv'>
                            <p>Status</p>
                        </div>
                        <p className='taskCount'>📘 <span className='numArticles'>5</span> articles</p>
                    </div>
                    
                </div>

                <div className='nextTask'>
                    <div>
                        <p>Current task name</p>
                        <p>Quick description</p>
                        
                        <div className='moduleButtonDiv'>
                            <p>Start task</p>
                        </div>
                    </div>
                    
                </div>

                <p>Dont know where to start? Take our quiz!</p>
            </div>
            
            <div className='item2'></div>

            <div className='item3'>
                <p>Complete module</p>
            </div>
        </div>
        </>
    )
}

export default Roadmap