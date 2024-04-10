import { Router } from "express";
import { usersViewRouter } from "./users.view.js";
import { productsViewRouter } from "./products.view.js";
import { fruitManager } from "../../data/fs/ProductsManager.fs.js";
const viewsRouter = Router();

viewsRouter.use("/users", usersViewRouter);
viewsRouter.use("/products", productsViewRouter);

viewsRouter.use("/", async (req, res, next) => {
    try {
        const fruits = await fruitManager.read();
        return res.render("home", { title: "Welcome!", products: fruits });
    } catch (error) {
        next(error)
    }
}
)

export default viewsRouter;