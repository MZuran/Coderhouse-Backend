import CustomRouter from "../customRouter.js";
import { cartTotal } from "../../controllers/tickets.controller.js";

class ticketsRouterClass extends CustomRouter {
    init() {
        this.read("/", ["USER", "ADMIN"], cartTotal);
    }
}

const ticketsRouter = new ticketsRouterClass();
export default ticketsRouter.getRouter();