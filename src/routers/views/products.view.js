import { Router } from "express"
import { fruitManager } from "../../data/fs/ProductsManager.fs.js";

export const productsViewRouter = Router();

productsViewRouter.get("/", productsView);

async function productsView(req, res, next) {
    try {
        return res.render("products", { title: "TEST" });
    } catch (error) {
        next(error)
    }
}