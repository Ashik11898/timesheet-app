'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useWebSocket } from '../hooks/useWebSocket'; // Adjust the path as needed

export default function ChatPage() {
  const [message, setMessage] = useState<string>(''); // Message typed by the user
  //const { messages, sendMessage, socketReady } = useWebSocket('wss://timesheet-app-server.vercel.app/ws');
  const { messages, sendMessage, socketReady } = useWebSocket('wss://timesheet-app-rb2n.onrender.com/ws');


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
          <CardTitle>AI Chat</CardTitle>
        </CardHeader>
        <CardContent className="h-[60vh] overflow-y-auto space-y-4">
          {/* Display messages here */}
          {messages.map((msg, index) => (
            <div key={index} className="message">
              <div><span>{msg.name}:</span> {msg.message}</div>
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
