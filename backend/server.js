import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from 'dotenv';
import path from "path";
import http from "http";
import { WebSocketServer } from "ws"; // `ws` exports WebSocketServer for ES modules
import loginRoutes from "./routes/loginRoutes.js";
import streamingRoutes from "./routes/streamRoutes.js";
import { handleWebSocketConnection } from "./handler/wsHandler.js";

// Initialize the Express app
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5000",
      "http://localhost:5173",
      "https://timesheet-app-eight.vercel.app",
      "http://192.168.151.103:5173",
      "https://timesheet-app-main.vercel.app",
    ], // Update with your frontend origin
    credentials: true, // Allow cookies to be sent
  })
);
dotenv.config();

// Get the current directory name using ES modules
const __dirname = path.resolve();

// LOGIN ROUTES
app.use("/api", loginRoutes);

// STREAM ROUTES
app.use("/stream", streamingRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "/dist", "index.html"));
  });
}

// Create HTTP server to integrate with WebSocket
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: "/ws" });

// Handling WebSocket connections
wss.on("connection", handleWebSocketConnection);



// Start the HTTP server (with WebSocket support)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log("Server is running on port:", PORT));
