import cartRouter from "./carts.api.js";
import usersRouter from "./users.api.js";
import productsRouter from "./products.api.js";
import cookiesRouter from "./cookies.api.js";
import sessionsRouter from "./sessions.api.js";
import ticketsRouter from "./tickets.api.js";
import paymentRouter from "./payment.api.js";

import CustomRouter from "../customRouter.js";

class apiRouterClass extends CustomRouter {
    init() {
        this.use("/users", usersRouter);
        this.use("/products", productsRouter);
        this.use("/carts", cartRouter);
        this.use("/cookies", cookiesRouter);
        this.use("/sessions", sessionsRouter);
        this.use("/tickets", ticketsRouter);
        this.use("/payments", paymentRouter);
    }
}

const apiRouter = new apiRouterClass();

export default apiRouter.getRouter();