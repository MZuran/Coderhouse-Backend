import { getTokenFromReq } from "../utils/token.util.js";
import parseId from "../utils/parseId.util.js";

import {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} from "../services/users.service.js"

async function isVerified(req, res, next) {
  const token = getTokenFromReq(req,res)
  

  if (!token.role || (token._id != user_id && token.role != 1)) {
    return res.error401()
  }

  return next();
}

export default isVerified