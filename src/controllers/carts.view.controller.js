import { getTokenFromReq } from "../utils/token.util.js";
import parseId from "../utils/parseId.util.js";

import { readService, } from "../services/carts.service.js"
import { readOneService as readOneProductService, } from "../services/carts.service.js"

class cartsViewController {
    async cartsView(req, res, next) {
        try {
            const { uid } = req.params;
            let cartItems = await readService({ user_id: uid });
            let name

            if (cartItems) {
                console.log(cartItems[0].user_id)
                name = await readOneProductService(parseId(cartItems[0].user_id))
                name = await readOneProductService(parseId(cartItems[0].user_id))
            }

            // Populate them manually so that it works for all persistences
            cartItems = await Promise.all(cartItems.map(async item => {
                item.product_id = await readOneProductService(parseId(item.product_id));
                item.product_id = await readOneProductService(parseId(item.product_id));
                return item;
            }));

            let total = 0
            cartItems.forEach(item => {
                total = total + item.product_id.price * item.quantity
                //console.log(item.product_id.price * item.quantity)
            });
            //console.log(total)

            let hasItems = true
            if (cartItems.length == 0) { hasItems = false }

            return res.render("cart", { title: "CART", cart: cartItems, name: name, total: total, hasItems: hasItems });
        } catch (error) {
            next(error)
        }
    }

    async cartsMe(req, res, next) {
        try {
            const { _id, name } = getTokenFromReq(req, res)
            let cartItems = await readService({ user_id: _id });

            // Populate them manually so that it works for all persistences
            cartItems = await Promise.all(cartItems.map(async item => {
                item.product_id = await readOneProductService(parseId(item.product_id));
                item.product_id = await readOneProductService(parseId(item.product_id));
                return item;
            }));

            let total = 0
            cartItems.forEach(item => {
                total = total + item.product_id.price * item.quantity
                //console.log(item.product_id.price * item.quantity)
            });
            //console.log(total)

            let hasItems = true
            if (cartItems.length == 0) { hasItems = false }

            return res.render("cart", { title: "CART", cart: cartItems, name: name, total: total, hasItems: hasItems });
        } catch (error) {
            next(error)
        }
    }

    async cartsThanks(req, res, next) {
        try {
            return res.render("thanks", { title: "Thank you!" });
        } catch (error) {
            next(error)
        }
    }

    //Methods
    async addQuantity(cart_id, quantity) {
        try {
            const currentAmount = readServiceOne(cart_id).quantity
            console.log("My current amount is", currentAmount)
            alert("I work")
        } catch (error) {
            throw error
        }
    }
}

const cartsViewControllerInstance = new cartsViewController()
export const { cartsView, addQuantity, cartsMe, cartsThanks } = cartsViewControllerInstance