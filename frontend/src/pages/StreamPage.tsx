import { useEffect, useState } from 'react';

const StreamPage = () => {

    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        const eventSource = new EventSource('http://localhost:5000/stream/getTime');
    
        eventSource.onmessage = (event) => {
          setMessages((prevMessages) => [...prevMessages, event.data]);
        };
    
        eventSource.onerror = () => {
          console.error('Error occurred while connecting to the server.');
          eventSource.close();
        };
    
        return () => {
          eventSource.close();
        };
      }, []);

  return (
    <div>
      <h1>Server Updates</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}
      </div>
    </div>
  )
}

export default StreamPage