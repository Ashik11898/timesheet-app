// import { userCredentials } from "../constants";


// Array to keep track of all connected clients
const clients = [];
//const onlineUsers = userCredentials

export const handleWebSocketConnection = (ws) => {
  console.log("WS connection arrived");

  // Add the new connection to the list of clients
  clients.push(ws);

  // Handle incoming messages from clients
  ws.on("message", function incoming(userMsg) {
    const { name, message,messageId,time } = JSON.parse(userMsg);
    console.log(name, message );
    const socket = ws._socket
    console.log(`Connection from ${socket.remoteAddress}:${socket.remotePort}`);
    
    
    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        console.log("server recive msg",message);
        client.send(JSON.stringify({ name: name, message: message,messageId:messageId,time:time,status:"online" }));
      }
      else{
        console.log("its not ready state");
        
      }
    });
  });

  // Remove client from the list when connection is closed
  ws.on("close", () => {
    console.log("WS connection closed");
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.splice(index, 1);
      console.log("WS connection closed 1");
    }
  });

  // Send a welcome message on new connection
 //ws.send(JSON.stringify({ name: "server", message: "Welcome to the chat",messageId:"serverID" }));
 
};


