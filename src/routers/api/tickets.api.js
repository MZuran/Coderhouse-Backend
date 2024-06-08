import CustomRouter from "../customRouter.js";
import cartsManager from "../../data/mongo/managers/cartsManager.mongo.js";

class ticketsRouterClass extends CustomRouter {
    init() {
        this.read("/", ["USER", "ADMIN"], cartTotal);
    }
}

async function cartTotal(req, res, next) {
    try {
        const list = await cartsManager.read({user_id: req.session.user_id});

        return res.response200(list)
    } catch (error) {
        next(error)
    }
}

const ticketsRouter = new ticketsRouterClass();
export default ticketsRouter.getRouter();