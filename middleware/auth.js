import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/userModels.js"

 dotenv.config();

 export function  verifyToken (req, res,next) {
  const token = req.cookies.access_token;
  if(!token){
    return res.status(401).json({error: "You not Authoraized"})
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
    if(err){
      return res.status().json({ERROR: "Token Are Invalid"})
    }
    req.user = user;
    next()
  })
}

export function verifyUser(req, res, next) {
  let token = req.headers["access_token"] || req.cookies["access_token"];

  if (!token) {
      return res.status(403).send("Login Please!");
  }
  try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
  } catch (err) {
      return res.status(401).send("Invalid Token");
  }
  return next();
}

export function admin(req, res, next) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(401).send("Not Authorized");
  }
}
