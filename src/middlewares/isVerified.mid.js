import { getTokenFromReq } from "../utils/token.util.js";

function isViewRequest(req) {
  return req.method === 'GET' && !req.originalUrl.startsWith('/api')
}

async function isVerified(req, res, next) {
  const token = getTokenFromReq(req, res)
  if (token.verified) {
    return next();
  } else {
    if (isViewRequest(req)) {
      return res.verificationError()
    }
  }

  return res.error401()
}

export default isVerified