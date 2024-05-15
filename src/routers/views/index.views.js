import { Router } from "express";
import { usersViewRouter } from "./users.view.js";
import { productsViewRouter } from "./products.view.js";
import { cartsViewRouter } from "./carts.view.js";

const viewsRouter = Router();

viewsRouter.use("/users", usersViewRouter);
viewsRouter.use("/products", productsViewRouter);
viewsRouter.use("/cart", cartsViewRouter)

//Landing page
import { productsView } from "./products.view.js";
viewsRouter.get("/", productsView);

export default viewsRouter;