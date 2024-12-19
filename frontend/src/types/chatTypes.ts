// Define types for the props
export type Message = {
    messageId: number;
    name: string;
    message: string;
    time: string;
  };
  
export  type ChatCardProps = {
    username: string | null;
    messages: Message[];
    socketReady: boolean;
    message: string;
    setMessage: (message: string) => void;
    handleSubmit: (event: React.FormEvent) => void;
  };