// SocketContext.js
import React, { createContext, useContext, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const socketRef = useRef();

    useEffect(() => {
        const socket = io("http://localhost:8000");
        socketRef.current = socket;
        console.log("Socket connection established");

        return () => {
            socket.disconnect();
            console.log("Socket disconnected");
        };
    }, []);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
