import CustomRouter from "../customRouter.js";
import { cartsView, cartsMe, cartsThanks } from "../../controllers/carts.view.controller.js";

class cartsViewRouterClass extends CustomRouter {
    init() {
        this.read("/user/:uid", ["ADMIN"], cartsView);
        this.read("/me", ["REGISTERED"], cartsMe);
        this.read("/thanks", ["REGISTERED"], cartsThanks);
        this.read("/", ["REGISTERED"], cartsMe);
    }
}

const cartsViewRouter = new cartsViewRouterClass();
export default cartsViewRouter.getRouter()