'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useWebSocket } from '../hooks/useWebSocket'; // Adjust the path as needed

export default function ChatPage() {
  const [message, setMessage] = useState<string>(''); // Message typed by the user
  const { messages, sendMessage, socketReady } = useWebSocket('http://localhost:5000/ws');
  //const { messages, sendMessage, socketReady } = useWebSocket('wss://timesheet-app-rb2n.onrender.com/ws');
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Hi, {username}</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto space-y-4">
          {/* Display messages here */}
          {messages.map((msg) => (
            <div
              key={msg.messageId}
              className={`w-full message  flex ${msg.name === username ? 'justify-end' : 'justify-start'}`}
            >
              <div className='shadow-lg p-3 pt-2 bg-gray-100'>
                <span className='text-sm font-bold'> {msg.name === username ?"": msg.name} </span>
                <p className='text-lg'>{msg.message}</p>
                <p className='text-xs text-right'>{msg.time}</p>
              </div>
            </div>
          ))}
        </CardContent>

        <CardFooter>
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" disabled={!socketReady}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}
