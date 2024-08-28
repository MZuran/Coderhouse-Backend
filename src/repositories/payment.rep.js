import CheckoutProduct from "../dto/payment.dto.js";
import Stripe from "stripe";

import { readService as readCarts } from "../services/carts.service.js"
import { readOneService as readOneProduct } from "../services/products.service.js";

//TODO: Change success url

/*
    Doesn't use the base repository class apparently
    We only really ever use filter for user_id
*/
const checkoutRepository = async (filter) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        let productsOnCart = await readCarts(filter);

        //Populate the carts
        productsOnCart = await Promise.all(productsOnCart.map(async cart => {
            cart.product_id = await readOneProduct(cart.product_id);
            return cart;
        }));
        
        productsOnCart = productsOnCart.map((each) => new CheckoutProduct(each));
        const line_items = productsOnCart;
        const mode = "payment";
        const success_url = "http://localhost:8080/thanks.html";
        const intent = await stripe.checkout.sessions.create({
            line_items,
            mode,
            success_url,
        });
        return intent;
    } catch (error) { throw error }
};

export { checkoutRepository };