import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ChatBot.css'

const ChatBot = () => {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: "ThriveBot is here to help you level up your resume! Paste your bullet points into the chat to get personalized feedback — or tell us where you are in your resume-building journey, and we'll guide you from there." }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [userInfo, setUserInfo] = useState(null)
    const [isMinimized, setIsMinimized] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [isSessionActive, setIsSessionActive] = useState(false)

    useEffect(() => {
        // Fetch user information when component mounts
        const fetchUserInfo = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/user/profile')
                setUserInfo(response.data)
            } catch (error) {
                console.error('Error fetching user info:', error)
            }
        }
        fetchUserInfo()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!message.trim()) return

        setIsLoading(true)
        setError(null)
        const userMessage = message
        setMessage('')
        
        // Add user message to chat history
        setChatHistory(prev => [...prev, { role: 'user', content: userMessage }])

        try {
            console.log('Sending message to server:', userMessage)
            const response = await axios.post('http://localhost:3000/api/chat', {
                message: userMessage,
                userInfo: userInfo
            })
            console.log('Server response:', response.data)

            // Add assistant response to chat history
            setChatHistory(prev => [...prev, { role: 'assistant', content: response.data.response }])
        } catch (error) {
            console.error('Detailed error:', error)
            setError(error.response?.data?.details || error.message)
            setChatHistory(prev => [...prev, { 
                role: 'assistant', 
                content: `Sorry, I encountered an error: ${error.response?.data?.details || error.message}` 
            }])
        } finally {
            setIsLoading(false)
        }
    }

    const toggleMinimize = () => {
        setIsMinimized(!isMinimized)
        if (isMaximized) setIsMaximized(false)
    }

    const toggleMaximize = () => {
        setIsMaximized(!isMaximized)
        if (isMinimized) setIsMinimized(false)
    }

    const handleClose = () => {
        setIsVisible(false)
        setIsSessionActive(false)
        // Reset chat history when closing
        setChatHistory([
            { role: 'assistant', content: "ThriveBot is here to help you level up your resume! Paste your bullet points into the chat to get personalized feedback — or tell us where you are in your resume-building journey, and we'll guide you from there." }
        ])
    }

    const handleEntryClick = () => {
        setIsVisible(true)
        setIsSessionActive(true)
        setIsMinimized(false)
    }

    return (
        <>
            <div 
                className={`chatbot-entry ${isVisible ? 'hidden' : ''}`}
                onClick={handleEntryClick}
            >
                <span className="chatbot-entry-icon">💬</span>
                <span>Get Help from ThriveBot</span>
            </div>
            <div className={`chatbot ${isVisible ? 'visible' : ''} ${isMinimized ? 'minimized' : ''} ${isMaximized ? 'maximized' : ''}`}>
                <div className="thrivebot-title" onClick={toggleMinimize}>
                    <h1>ThriveBot</h1>
                    <div className="title-buttons">
                        <button className="maximize-button" onClick={(e) => {
                            e.stopPropagation()
                            toggleMaximize()
                        }}>
                            {isMaximized ? '🗕' : '⤢'}
                        </button>
                        <button className="minimize-button" onClick={(e) => {
                            e.stopPropagation()
                            toggleMinimize()
                        }}>
                            {isMinimized ? '▲' : '▼'}
                        </button>
                        <button 
                            className="close-button" 
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handleClose()
                            }}
                        >
                            ✕
                        </button>
                    </div>
                </div>
                {!isMinimized && (
                    <>
                        <div className="chatbot-header">
                            <h2>Review Your Resume</h2>
                            <div className="disclaimer-tooltip">
                                <span className="tooltip-icon">ℹ️</span>
                                <div className="tooltip-content">
                                    <strong>Privacy Notice:</strong> Please do not enter any personal information such as:
                                    <ul>
                                        <li>Full name</li>
                                        <li>Address</li>
                                        <li>Phone number</li>
                                        <li>Email address</li>
                                        <li>Social security number</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="chatbot-body">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`chatbot-message ${msg.role}`}>
                                    <p dangerouslySetInnerHTML={{ 
                                        __html: msg.content
                                            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                                            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                                            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                                            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                            .replace(/\*(.*?)\*/g, '<em>$1</em>')
                                            .replace(/^\s*[-*+]\s+(.*$)/gm, '<li>$1</li>')
                                            .replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>')
                                            .replace(/1\. Goal:/g, '<br><br><strong>1. Goal:</strong>')
                                            .replace(/2\. Original Bullet:/g, '<br><br><strong>2. Original Bullet:</strong>')
                                            .replace(/3\. Improved Bullet:/g, '<br><br><strong>3. Improved Bullet:</strong>')
                                            .replace(/4\. Tips:/g, '<br><br><strong>4. Tips:</strong>')
                                    }} />
                                </div>
                            ))}
                            {isLoading && (
                                <div className="chatbot-message assistant">
                                    <p>Thinking...</p>
                                </div>
                            )}
                        </div>
                        <form onSubmit={handleSubmit} className="chatbot-input">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Paste your work experience here"
                                disabled={isLoading}
                            />
                            <button type="submit" disabled={isLoading}>
                                →
                            </button>
                        </form>
                    </>
                )}
            </div>
        </>
    )
}

export default ChatBot