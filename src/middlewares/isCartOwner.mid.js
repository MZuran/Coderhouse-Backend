import { getTokenFromReq } from "../utils/token.util.js";
import parseId from "../utils/parseId.util.js";
import dao from "../dao/dao.factory.js";

/*
  This middleware is meant to give users permissions to modify their own carts. 
  Admins can bypass this.
*/

async function isCartOwner(req, res, next) {
  const token = getTokenFromReq(req)
  const { cid } = req.params

  const cart = await dao.carts.readOne(cid)
  const user_id = parseId(cart.user_id)

  if (!token.role || (token._id != user_id && token.role != 1)) {
    return res.error401()
  }

  return next();
}

export default isCartOwner