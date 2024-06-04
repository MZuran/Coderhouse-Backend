import { Router } from "express";
import cartRouter from "./carts.routers.api.js";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";

import CustomRouter from "../customRouter.js";

class apiRouterClass extends CustomRouter {
    init() {
        this.use("/users", usersRouter);
        this.use("/products", productsRouter);
        this.use("/carts", cartRouter);
        this.use("/cookies", cookiesRouter);
        this.use("/sessions", sessionsRouter);
    }
}

const apiRouter = new apiRouterClass();


export default apiRouter.getRouter();
