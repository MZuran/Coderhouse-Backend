import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";
import CustomRouter from "./customRouter.js";

class indexRouterClass extends CustomRouter{
    init() {
        this.use("/api", apiRouter);
        this.use("/", viewsRouter)
    }
}

const indexRouter = new indexRouterClass()

export default indexRouter.getRouter();
