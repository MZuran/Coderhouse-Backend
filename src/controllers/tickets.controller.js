
import cartsManager from "../dao/mongo/managers/cartsManager.mongo.js";

class TicketsController {
     async cartTotal(req, res, next) {
        try {
            const list = await cartsManager.read({user_id: req.session.user_id});
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