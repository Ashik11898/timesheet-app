import { useState, useRef, useEffect } from 'react';

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<any[]>([]); // Store received messages
  const [socketReady, setSocketReady] = useState<boolean>(false); // Track WebSocket connection readiness
  const socketRef = useRef<WebSocket | null>(null); // Store the WebSocket reference

  useEffect(() => {
    // Create WebSocket connection
    socketRef.current = new WebSocket(url);

    const socket = socketRef.current;

    socket.onopen = () => {
      console.log('WebSocket connection established.');
      setSocketReady(true); // Set ready state to true when the socket opens
    };

    socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      console.log("receivedMessage from server:", receivedMessage);
      
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      setSocketReady(false); // Handle WebSocket errors
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
      setSocketReady(false); // Set ready state to false when the socket closes
    };

    // Cleanup WebSocket connection on component unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, [url]); // Depend on URL, in case it's changed



  const sendMessage = (message: string) => {
  

    
    if (socketRef.current?.readyState === 1) {
      // socketRef.current.send(JSON.stringify({ description: message }));
      console.log("send msg:",message);
      let username = localStorage.getItem("username")
      socketRef.current.send(JSON.stringify({ name: username, message: message }));
    } else {
      console.error('WebSocket is not open. Message not sent.');
    }
  };

  return { messages, sendMessage, socketReady };
};
