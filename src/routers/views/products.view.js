import { Router } from "express"
import { fruitManager } from "../../data/fs/ProductsManager.fs.js";
import productManagerMongo from "../../data/mongo/managers/productManager.mongo.js";

const selectedManager = productManagerMongo

export const productsViewRouter = Router();

productsViewRouter.get("/", productsView);
productsViewRouter.get("/real", productsViewReal);
productsViewRouter.get("/:nid", productsViewOne);



export async function productsView(req, res, next) {
    try {
        const fruits = await selectedManager.read();
        return res.render("products", { title: "PRODUCTS", products: fruits });
    } catch (error) {
        next(error)
    }
}

 async function productsViewOne(req, res, next) {
    try {
      const { nid } = req.params;
      const one = await selectedManager.readOne(nid);
      return res.render("details", { title: "DETAILS", fruit: one });
    } catch (error) {
      return next(error);
    }
  }

  async function productsViewReal(req, res, next) {
    try {
      return res.render("real", { title: "REAL" });
    } catch (error) {
      return next(error);
    }
  }