import jwt from "jsonwebtoken";
import dotenv from "dotenv";

 dotenv.config();

 export function verifyToken (req, res,next) {
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
 verifyToken(req, res, ()=>{
  if(req.user.id=== req.params.id || req.user.isAdmin){
    next();
  }else{
    return res.status(403).json({message: "you not authorized!"})
  }
 });
}

export function verifyAdmin(req, res, next) {
  verifyToken(req, res, ()=>{
   if(req.user.isAdmin){
     next();
   }else{
     return res.status(403).json({message: "you not authorized!"})
   }
  });
 }
