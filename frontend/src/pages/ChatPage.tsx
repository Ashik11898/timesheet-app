'use client';
import { useState } from 'react';
import ChatCard from '@/components/chat/ChatCard';
import { useWebSocket } from '../hooks/useWebSocket';

export default function ChatPage() {
  const [message, setMessage] = useState<string>(''); 
  //  const { messages, sendMessage, socketReady } = useWebSocket('http://localhost:5000/ws');
  const { messages, sendMessage, socketReady } = useWebSocket('wss://timesheet-app-rb2n.onrender.com/ws');
  let username = localStorage.getItem("username")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("messages display:",messages);

    if (message.trim() !== '') {
      sendMessage(message); // Send the message using the custom hook's sendMessage function
      setMessage(''); // Clear input field after sending message
    }
  };


  return (
    <div className="flex justify-center min-h-screen bg-[#F2E5BF] sm:p-6 p-1 sm:items-center items-start">
     <ChatCard
        username={username}
        messages={messages}
        socketReady={socketReady}
        message={message}
        setMessage={setMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
  
}
