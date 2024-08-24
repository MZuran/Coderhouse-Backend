import jwt from "jsonwebtoken";
import enviroment from "./env.util.js";

const createToken = (data) => {
  const opts = { expiresIn: 60 * 60 * 24 };
  const token = jwt.sign(data, enviroment.SECRET_JWT, opts);
  return token;
};

const verifyToken = (token) => {
  const data = jwt.verify(token, enviroment.SECRET_JWT);
  return data;
};

const getTokenFromReq = (req) => {
  let token = req.cookies['token']
  if (token) {
    return verifyToken(token)
  } else {
    return {}
  }
}

export { createToken, verifyToken, getTokenFromReq };