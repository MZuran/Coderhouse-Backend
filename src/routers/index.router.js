import { Router } from "express";
import apiRouter from "./api/index.api.js";
import viewsRouter from "./views/index.views.js";

const indexRouter = Router();

indexRouter.use("/api", apiRouter);
indexRouter.use("/", viewsRouter)

export async function apiRootRoute(req, res) {
    try {
        return res.status(200).json({
          response: "Hello welcome to the API",
          success: true,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          response: "CATRASTROPHICAL ERROR",
          success: false,
        });
      }
}

export default indexRouter;
