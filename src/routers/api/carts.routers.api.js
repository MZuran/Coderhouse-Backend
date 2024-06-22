import { Router } from "express";
import CustomRouter from "../customRouter.js";
import {createCart, readCart, updateCart, deleteCart, deleteAllCarts} from "../../controllers/carts.controller.js"

class cartRouterClass extends CustomRouter {
  init() {
    this.create("/", ["USER", "ADMIN"], createCart);
    this.read("/", ["USER", "ADMIN"], readCart);
    this.update("/:cid", ["USER", "ADMIN"], updateCart);
    this.destroy("/one/:cid", ["USER", "ADMIN"], deleteCart);
    this.destroy("/all", ["USER", "ADMIN"], deleteAllCarts);
  }
}

const cartRouter = new cartRouterClass();

export default cartRouter.getRouter();
