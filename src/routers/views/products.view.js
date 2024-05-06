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
    let { page } = req.query;
    if (!page) { page = 1 }
    console.log("My page is", page)
    //const fruits = await selectedManager.read();
    const fruits = await selectedManager.paginate({}, { limit: 4, page: page });
    return res.render("products-paginated", { title: "PRODUCTS", products: fruits.docs, data: fruits, page: page, prevPage: JSON.parse(page) - 1, nextPage: JSON.parse(page) + 1 });
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