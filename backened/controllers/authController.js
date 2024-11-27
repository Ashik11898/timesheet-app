const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/tokenUtils');
const { userCredentials } = require('../constants');

const handleLogin = (req, res) => {
    const { email,password } = req.body;
    console.log(req.body);

    if (userCredentials.email === email && userCredentials.password === password) {
        const accessToken = generateAccessToken({ password, email });
        const refreshToken = generateRefreshToken({ email });

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.json({ accessToken,isValid:true });
    } else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
};


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
console.log("jwt cookies:",req.cookies.jwt);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded; // Attach the decoded token payload to the request
        next();
    });
};



const addingEmployes = (req, res) => {
    res.send("is employ valid")
};

module.exports = { addingEmployes,handleLogin,verifyToken };
