import { verifyToken } from "../utils/token.util.js";

function setLocals(req, res, next) {
    if (req.cookies['token']) {
        const token = verifyToken(req.cookies['token']);
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