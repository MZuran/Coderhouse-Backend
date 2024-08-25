import { Router } from "express"
import CustomRouter from "../customRouter.js";

class cartsViewRouterClass extends CustomRouter {
    init() {
        //this.read("/:uid", ["REGISTERED"], cartsView);
        //this.read("/me", ["REGISTERED"], cartsView);
    }
}

const cartsViewRouter = new cartsViewRouterClass();
export default cartsViewRouter.getRouter()