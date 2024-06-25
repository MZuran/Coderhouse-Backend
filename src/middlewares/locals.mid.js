import { verifyToken } from "../utils/token.util.js";

function setLocals(req, res, next) {
    const token = verifyToken(req.cookies['token']);
    if (token) {
        res.locals.localUser = {
            online: true,
            name: token.name,
            photo: token.photo
        }
    } else {
        res.locals.localUser = {
            online: false
        }
    }
    next();
}

export default setLocals