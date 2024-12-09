require('dotenv').config();
const express = require("express")
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('./routes/loginRoutes');

const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:5000','http://localhost:5173','https://timesheet-app-eight.vercel.app','https://timesheet-app-server.vercel.app'], // Update with your frontend origin
    credentials: true // Allow cookies to be sent
}));




// LOGIN ROUTES
app.use('/api', routes)



const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("server is running in this port:",process.env.PORT))