const jwt = require('jsonwebtoken');


const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '2m' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload,  process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

module.exports = { generateAccessToken, generateRefreshToken };
