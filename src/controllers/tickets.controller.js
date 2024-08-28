
import cartsManager from "../dao/mongo/managers/cartsManager.mongo.js";
import { getTokenFromReq } from "../utils/token.util.js";

class TicketsController {
     async cartTotal(req, res, next) {
        try {
            const token = getTokenFromReq(req)
            const list = await cartsManager.read({user_id: token.user_id});
            let total = 0
            list.forEach(element => {
                total =+ element.product_id.price * element.quantity
            });
    
            return res.response200(total)
        } catch (error) {
            next(error)
        }
    }
}

const ticketsController = new TicketsController()
export const {cartTotal} = ticketsController