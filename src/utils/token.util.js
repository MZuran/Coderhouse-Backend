import jwt from "jsonwebtoken";
import enviroment from "./env.util.js";

const createToken = (data) => {
  const opts = { expiresIn: 60 * 60 };
  const token = jwt.sign(data, enviroment.SECRET_JWT, opts);
  return token;
};

const verifyToken = (token) => {
  try {
    const data = jwt.verify(token, enviroment.SECRET_JWT);
    return data;
  } catch (error) {
    return null;
  }
};

const getTokenFromReq = (req, res) => {
  let token = req.cookies['token']
  if (token) {
    const verifiedToken = verifyToken(token)
    if (verifiedToken == null) {
      console.log("Invalid Token. Clearing Cookie.")
      res.clearCookie('token');
    } else {
      return verifiedToken
    }
  } else {
    return {}
  }
}

export { createToken, verifyToken, getTokenFromReq };