import { WebSocketServer } from "ws";

// Array to keep track of all connected clients
const clients = [];

export const handleWebSocketConnection = (ws) => {
  console.log("WS connection arrived");

  // Add the new connection to the list of clients
  clients.push(ws);

  // Handle incoming messages from clients
  ws.on("message", function incoming(userMsg) {
    const { name, message } = JSON.parse(userMsg);
    console.log(name, message );
    
    // Broadcast the message to all connected clients
    clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        console.log("server recive msg",message);
        client.send(JSON.stringify({ name: name, message: message }));
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
      console.log("WS connection closed");
    }
  });

  // Send a welcome message on new connection
  ws.send(JSON.stringify({ name: "server", message: "Welcome to the chat" }));
};
