import CustomRouter from "../customRouter.js";
import { createCart, readCart, updateCart, deleteCart, deleteAllCarts } from "../../controllers/carts.controller.js"
import isCartOwner from "../../middlewares/isCartOwner.mid.js";

class cartRouterClass extends CustomRouter {
  init() {
    this.create("/", ["REGISTERED"], createCart);
    this.read("/", ["REGISTERED"], readCart);
    this.update("/:cid", ["REGISTERED"], isCartOwner, updateCart);
    this.destroy("/one/:cid", ["REGISTERED"], isCartOwner, deleteCart);
    this.destroy("/all", ["REGISTERED"], deleteAllCarts);
  }
}

const cartRouter = new cartRouterClass();

export default cartRouter.getRouter();