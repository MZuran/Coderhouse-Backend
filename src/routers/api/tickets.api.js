import CustomRouter from "../customRouter.js";
import { verifyToken } from "../../utils/token.util.js";

class ticketsRouterClass extends CustomRouter{
    init() {
        this.read("/", ["PUBLIC"], cartTotal);
    }
}

async function cartTotal(req, res, next) {
    try {
        const user = req.session
        console.log(user)

        let token = req.cookies['token']
        //const {role, email} = verifyToken(token)

        return res.response200(req.cookies)
    } catch (error) {
        next(error)
    }
}

const ticketsRouter = new ticketsRouterClass();
export default ticketsRouter.getRouter();