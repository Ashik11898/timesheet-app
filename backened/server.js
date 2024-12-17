require('dotenv').config();
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');
const loginRoutes = require('./routes/loginRoutes');
const streamingRoutes = require('./routes/streamRoutes');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5000', 'http://localhost:5173', 'https://timesheet-app-eight.vercel.app', 'http://192.168.151.103:5173','https://timesheet-app-server.vercel.app'], // Update with your frontend origin
    credentials: true // Allow cookies to be sent
}));

// LOGIN ROUTES
app.use('/api', loginRoutes);
// STREAM ROUTES
app.use('/stream', streamingRoutes);

// Create HTTP server to integrate with WebSocket
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Array to keep track of all connected clients
const clients = [];
const messages =[];


wss.on('connection', function connection(ws) {
    console.log("WS connection arrived");
    //console.log("WS connection",ws);
    // Add the new connection to our list of clients
    clients.push(ws);

    ws.on('message', function incoming(userMsg) {
        let {name,message}=JSON.parse(userMsg)
      

        // Broadcast the message to all clients
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                // console.log("message",message.toString())
                // client.send(JSON.stringify({ type: 'echo', message: message }));
                if (Buffer.isBuffer(message)) {
                    // Convert the buffer to a string using fromCharCode (assuming ASCII values)
                    const decodedMessage = String.fromCharCode(...message);
                   
                    console.log('Decoded message from buffer:', decodedMessage);
        
                    // Echo the decoded message back to the client
                    client.send(JSON.stringify({ name: decodedName, message: decodedMessage }));
                } else {
                    // If it's a string, simply echo it back as is
                    client.send(JSON.stringify({ name:name, message: message }));
                }
            }
        });
    });

    ws.on('close', () => {
        // Remove the client from the array when it disconnects
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });
    console.log("total no of clients:",clients.length);
    // Send a welcome message on new connection
    ws.send(JSON.stringify({ name: 'server',message:"welcome to the chat"  }));
});

// Start the HTTP server (with WebSocket support)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on port:", PORT));
