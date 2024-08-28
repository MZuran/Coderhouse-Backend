import { getTokenFromReq } from "../utils/token.util.js";
import parseId from "../utils/parseId.util.js";

import {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} from "../services/products.service.js"

/*
  This middleware is meant to give users permissions to modify their own products. 
  Admins can bypass this.
*/

async function isProductPublisher(req, res, next) {
  const token = getTokenFromReq(req)
  const { pid } = req.params

  const product = await readOneService(pid)
  const supplier_id = parseId(product.supplier_id)

  if (!token.role || (token._id != supplier_id && token.role != 1)) {
    return res.error401()
  }

  return next();
}

export default isProductPublisher