import { getTokenFromReq } from "../utils/token.util.js";

/*
  This middleware is meant to give users permissions to modify their own profiles. 
  Admins can bypass this.
*/

async function isUserFromParams(req, res, next) {
  const token = getTokenFromReq(req,res)
  const { uid } = req.params

  if (!token.role || (token._id != uid && token.role != 1)) {
    return res.error401()
  }

  return next();
}

export default isUserFromParams