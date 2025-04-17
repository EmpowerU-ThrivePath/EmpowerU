import React, { useState } from 'react'
import axios from 'axios'
import './ChatBot.css'

const ChatBot = () => {
    const [message, setMessage] = useState('')
    const [chatHistory, setChatHistory] = useState([
        { role: 'assistant', content: 'Hello! I\'m your educational assistant. How can I help you today?' }
    ])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

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
                message: userMessage
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

    return (
        <div className="chatbot">
            <div className="chatbot-header">
                <h2>Check Your Work!</h2>
            </div>
            <div className="chatbot-body">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`chatbot-message ${msg.role}`}>
                        <p>{msg.content}</p>
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
                    placeholder="Type your message here..."
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading}>
                    Send
                </button>
            </form>
        </div>
    )
}

export default ChatBot