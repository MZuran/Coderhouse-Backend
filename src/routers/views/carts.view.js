import { Router } from "express"
import cartManagerMongo from "../../dao/mongo/managers/cartsManager.mongo.js";
import CustomRouter from "../customRouter.js";

class cartsViewRouterClass extends CustomRouter {
    init() {
        this.read("/:uid", ["USER"], cartsView);
    }
}

const cartsViewRouter = new cartsViewRouterClass();
export default cartsViewRouter.getRouter()

const selectedManager = cartManagerMongo

async function cartsView(req, res, next) {
    try {
        const { uid } = req.params; 
        const cartItems = await selectedManager.read({user_id: uid});
        console.log("My cartItems are", cartItems)
        return res.render("cart", { title: "CART", cart: cartItems });
    } catch (error) {
        next(error)
    }
}

//Methods
async function addQuantity(cart_id, quantity) {
    try {
        const currentAmount = selectedManager.readOne(cart_id).quantity
        console.log("My current amount is", currentAmount)
        alert("I work")
    }  catch(error) {
        throw error
    }
}