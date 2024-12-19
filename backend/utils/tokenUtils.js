import jwt from "jsonwebtoken";

export const generateAccessToken = (payload) => {
  console.log("process.env.ACCESS_TOKEN_SECRET",process.env.PORT);
  
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2m" });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};
