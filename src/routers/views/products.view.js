import { Router } from "express"
import { fruitManager } from "../../data/fs/ProductsManager.fs.js";

export const productsViewRouter = Router();

productsViewRouter.get("/", productsView);
productsViewRouter.get("/:nid", productsViewOne);


async function productsView(req, res, next) {
    try {
        const fruits = await fruitManager.read();
        return res.render("products", { title: "PRODUCTS", products: fruits });
    } catch (error) {
        next(error)
    }
}

 async function productsViewOne(req, res, next) {
    try {
      const { nid } = req.params;
      const one = await fruitManager.readOne(nid);
      return res.render("details", { title: "DETAILS", fruit: one });
    } catch (error) {
      return next(error);
    }
  }