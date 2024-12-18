import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "../utils/tokenUtils.js";
import { userCredentials } from "../constants.js";

export const handleLogin = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const user = checkCredentials(userCredentials, email, password);

  if (user.isValid) {
    const accessToken = generateAccessToken({ password, email });
    const refreshToken = generateRefreshToken({ email });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.json({ isValid: true, name: user.username, accessToken });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

const checkCredentials = (credentials, email, password) => {
  const user = credentials.find((user) => user.email === email && user.password === password);
  return user ? { isValid: true, username: user.username } : { isValid: false };
};

export const verifyToken = (req, res, next) => {
  const cookies = req.cookies.jwt;
  if (!cookies) return res.status(401).json({ message: "No token provided, user needs to login" });
  console.log("cookies", cookies);

  jwt.verify(cookies, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    const accessToken = generateAccessToken({ email: decoded.email, password: decoded.password });
    res.json({ accessToken });
    next();
  });
};

export const addingEmployes = (req, res) => {
  res.send("is employ valid");
};
