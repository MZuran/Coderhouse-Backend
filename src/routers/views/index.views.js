import { Router } from "express";
import productsViewRouter from "./products.view.js";
import cartsViewRouter from "./carts.view.js";
import usersViewRouter from "./users.view.js";
import CustomRouter from "../customRouter.js";
import productsView from "./products.view.js";
import forgotPasswordViewRouter from "./forgotPassword.view.js";
import resetPasswordViewRouter from "./resetPassword.view.js";

class viewsRouterClass extends CustomRouter{
    init() {
        this.use("/users", usersViewRouter);
        this.use("/products", productsViewRouter);
        this.use("/cart", cartsViewRouter)
        this.read("/", ["PUBLIC"], productsView);
        this.use("/forgotpassword", forgotPasswordViewRouter);
        this.use("/resetpassword", resetPasswordViewRouter);
    }
}

const viewsRouter = new viewsRouterClass();

export default viewsRouter.getRouter();