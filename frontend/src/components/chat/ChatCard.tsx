import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input"; 
import { Button } from "@/components/ui/button"; 
import { Send } from 'lucide-react';
import { ChatCardProps} from "@/types/chatTypes";

const ChatCard = ({ username, messages, socketReady, message, setMessage, handleSubmit }: ChatCardProps) => {
  return (
    <Card className="w-full max-w-2xl bg-white rounded-xl shadow-lg border border-[#CB6040]">
      <CardHeader className="bg-[#257180] text-white rounded-t-xl py-5 px-6">
        <CardTitle className={`card-title text-2xl font-semibold ${socketReady ? "online" : ""}`}>
          { username} &nbsp; <span className="status-circle"></span>
        </CardTitle>
      </CardHeader>

      <CardContent className="h-[65vh] overflow-y-auto  p-6 space-y-6 message-box">
        {messages.map((msg) => (
          <div
            key={msg.messageId}
            className={`w-full message flex ${msg.name === username ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`p-4 rounded-lg shadow-md ${msg.name === username ? 'bg-[#FD8B51]' : 'bg-[#F2E5BF]'} max-w-[80%]`}>
              <span className={`block text-sm font-medium ${msg.name === username ? "text-white" : ""}`}>
                {msg.name === username ? "" : msg.name}
              </span>
              <p className={`text-lg font-semibold ${msg.name === username ? "text-[#fff]" : "text-[#EB5B00]"}`}>{msg.message}</p>
              <p className='text-xs text-right'>{msg.time}</p>
            </div>
          </div>
        ))}
      </CardContent>

      <CardFooter className="bg-[#257180] p-4 rounded-b-xl">
        <form onSubmit={handleSubmit} className="flex w-full space-x-4 items-center">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            autoFocus
            className="flex-grow bg-[#F2E5BF] border border-[#257180] text-[#257180] rounded-xl py-3 px-5 focus:outline-none focus:ring-2 focus:ring-[#FD8B51] placeholder:text-[#257180]"
          />
          <Button
            type="submit"
            disabled={!socketReady}
            className="bg-[#FD8B51] text-white rounded-xl px-6 py-3 hover:bg-[#CB6040] transition duration-200"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default ChatCard;
