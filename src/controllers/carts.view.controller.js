import dao from "../dao/dao.factory.js";
import { getTokenFromReq } from "../utils/token.util.js";
import parseId from "../utils/parseId.util.js";

import {
    createService,
    readService,
    readOneService,
    updateService,
    destroyService,
} from "../services/products.service.js";

class cartsViewController {
    async cartsView(req, res, next) {
        try {
            const { uid } = req.params;
            let cartItems = await dao.carts.read({ user_id: uid });
            let name

            if (cartItems) {
                console.log(cartItems[0].user_id)
                name = await readOneService(parseId(cartItems[0].user_id))
            }

            // Populate them manually so that it works for all persistences
            cartItems = await Promise.all(cartItems.map(async item => {
                item.product_id = await readOneService(parseId(item.product_id));
                return item;
            }));

            return res.render("cart", { title: "CART", cart: cartItems, name: name });
        } catch (error) {
            next(error)
        }
    }

    async cartsMe(req, res, next) {
        try {
            const { _id, name } = getTokenFromReq(req)
            let cartItems = await dao.carts.read({ user_id: _id });

            // Populate them manually so that it works for all persistences
            cartItems = await Promise.all(cartItems.map(async item => {
                item.product_id = await readOneService(parseId(item.product_id));
                return item;
            }));

            //console.log(cartItems)

            return res.render("cart", { title: "CART", cart: cartItems, name: name });
        } catch (error) {
            next(error)
        }
    }

    //Methods
    async addQuantity(cart_id, quantity) {
        try {
            const currentAmount = dao.carts.readOne(cart_id).quantity
            console.log("My current amount is", currentAmount)
            alert("I work")
        } catch (error) {
            throw error
        }
    }
}

const cartsViewControllerInstance = new cartsViewController()
export const { cartsView, addQuantity, cartsMe } = cartsViewControllerInstance