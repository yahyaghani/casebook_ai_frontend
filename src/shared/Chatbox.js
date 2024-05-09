// import React, { useState } from 'react';
// import'../style/theme-styles/components/Chatstyles';

// const ChatUI = () => {
//     const [messages, setMessages] = useState([]);
//     const [newMessage, setNewMessage] = useState('');

//     const handleSendMessage = () => {
//         if (newMessage.trim() !== '') {
//             setMessages([...messages, { text: newMessage, timestamp: new Date() }]);
//             setNewMessage(''); // Clear input after sending
//         }
//     };

//     const handleInputChange = (e) => {
//         setNewMessage(e.target.value);
//     };

//     const handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//             handleSendMessage();
//         }
//     };

//     return (
//         <div className="chat-container">
//             <div className="messages-list">
//                 {messages.map((msg, index) => (
//                     <div key={index} className="message">
//                         <div>{msg.text}</div>
//                         <div className="timestamp">{msg.timestamp.toLocaleTimeString()}</div>
//                     </div>
//                 ))}
//             </div>
//             <div className="message-input">
//                 <input
//                     type="text"
//                     value={newMessage}
//                     onChange={handleInputChange}
//                     onKeyPress={handleKeyPress}
//                     placeholder="Type a message..."
//                 />
//                 <button onClick={handleSendMessage}>Send</button>
//             </div>
//         </div>
//     );
// };

// export default ChatUI;
