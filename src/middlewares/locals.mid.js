import { getTokenFromReq } from "../utils/token.util.js";

function setLocals(req, res, next) {
    const token = getTokenFromReq(req,res)
    if (token.name) {
        res.locals.localUser = {
            online: true,
            name: token.name,
            photo: token.photo,
            role: token.role,
            _id: token._id
        }
    } else {
        res.locals.localUser = {
            online: false
        }
    }
    next();
}

export default setLocals