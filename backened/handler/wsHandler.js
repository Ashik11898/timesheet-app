const WebSocket = require('ws');

// Array to keep track of all connected clients
const clients = [];

const handleWebSocketConnection = (ws) => {
    console.log("WS connection arrived");

    // Add the new connection to the list of clients
    clients.push(ws);

    // Handle incoming messages from clients
    ws.on('message', function incoming(userMsg) {
        let { name, message } = JSON.parse(userMsg);
        
        // Broadcast the message to all connected clients
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                if (Buffer.isBuffer(message)) {
                    // Decode message if it is a buffer
                    const decodedMessage = String.fromCharCode(...message);
                    console.log('Decoded message from buffer:', decodedMessage);
                    client.send(JSON.stringify({ name: name, message: decodedMessage }));
                } else {
                    client.send(JSON.stringify({ name: name, message: message }));
                }
            }
        });
    });

    // Remove client from the list when connection is closed
    ws.on('close', () => {
        const index = clients.indexOf(ws);
        if (index > -1) {
            clients.splice(index, 1);
        }
    });

    // Send a welcome message on new connection
    ws.send(JSON.stringify({ name: 'server', message: "Welcome to the chat" }));
};

module.exports = { handleWebSocketConnection };
