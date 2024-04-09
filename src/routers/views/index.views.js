import { Router } from "express";
//import usersViewRouter from "./users.view.js";
import { productsViewRouter } from "./products.view.js";
const viewsRouter = Router();

//viewsRouter.use("/users", usersV iewRouter);
viewsRouter.use("/products", productsViewRouter);

viewsRouter.use("/", (req, res, next) => {
    try {
        return res.render("home", { title: "TEST" });
    } catch (error) {
        next(error)
    }
}
)

export default viewsRouter;