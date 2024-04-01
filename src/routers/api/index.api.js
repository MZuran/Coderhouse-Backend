import { Router } from "express";
import usersRouter from "./users.api.js";
const apiRouter = Router();

apiRouter.use("/users", usersRouter);

export default apiRouter;