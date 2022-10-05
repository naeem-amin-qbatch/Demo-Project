// require("dotenv").config();
import dotenv from 'dotenv'
dotenv.config()
const { TOKEN_KEY } = process.env;
import  verify  from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  console.log("req header auth:",req.headers.authorization)
  const token = req.headers.authorization.split(' ')[1];
  console.log('my token is:', token)
  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = verify(token, TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

export default verifyToken