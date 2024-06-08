import CustomRouter from "../customRouter.js";
import cartsManager from "../../data/mongo/managers/cartsManager.mongo.js";

class ticketsRouterClass extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], cartTotal);
    }
}

async function cartTotal(req, res, next) {
    try {
        const list = await cartsManager.read();

        return res.response200(list)
    } catch (error) {
        next(error)
    }
}

const ticketsRouter = new ticketsRouterClass();
export default ticketsRouter.getRouter();