import { Router } from "express"
import cartManagerMongo from "../../data/mongo/managers/cartsManager.mongo.js";

const selectedManager = cartManagerMongo

export const cartsViewRouter = Router();

cartsViewRouter.get("/:uid", cartsView);



async function cartsView(req, res, next) {
    try {
        const { uid } = req.params; 
        const products = await selectedManager.read({uid});
        return res.render("cart", { title: "CART", cart: products });
    } catch (error) {
        next(error)
    }
}