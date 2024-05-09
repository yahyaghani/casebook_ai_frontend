import React, { useState } from 'react';
import '../style/theme-styles/components/Chatstyles.css'; // Path check

const ChatUI = () => {
    const [messages, setMessages] = useState([
        { id: 1, avatarUrl: 'https://randomuser.me/api/portraits/women/44.jpg', nickName: 'Monika Figi', message: 'Hello there!', type: '' },
        { id: 2, avatarUrl: 'https://randomuser.me/api/portraits/men/32.jpg', nickName: 'Thomas Rogh', message: 'What\'s up?', type: '' },
    ]);

    const sendMessage = (text) => {
        if (text.trim()) {
            const newMessage = {
                id: messages.length + 1,
                avatarUrl: 'https://randomuser.me/api/portraits/men/9.jpg',
                nickName: 'Dennis Mikle',
                message: text,
                type: 'me'
            };
            setMessages([...messages, newMessage]);
        }
    };

    return (
        <div id="chat" className="--dark-theme">
            <div className="chat__conversation-board">
                {messages.map((msg, index) => (
                    <div key={index} className={`chat__conversation-board__message-container ${msg.type}`}>
                        <div className="chat__conversation-board__message__person">
                            <img src={msg.avatarUrl} alt={msg.nickName} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
                            <span className="chat__conversation-board__message__person__nickname">{msg.nickName}</span>
                        </div>
                        <div className="chat__conversation-board__message__context">
                            <span className="chat__conversation-board__message__bubble">{msg.message}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat__conversation-panel">
                <input
                    className="chat__conversation-panel__input"
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage(e.target.value)}
                />
                <button className="chat__conversation-panel__button" onClick={() => sendMessage('Random message')}>
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor"/>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ChatUI;
