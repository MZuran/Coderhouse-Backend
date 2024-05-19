import { Router } from "express";
import cartRouter from "./carts.routers.api.js";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";

const apiRouter = Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartRouter);
apiRouter.use("/cookies", cookiesRouter);
apiRouter.use("/sessions", sessionsRouter);

export default apiRouter;
