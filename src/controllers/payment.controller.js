import { checkoutService } from "../services/payment.service.js"
import { getTokenFromReq } from "../utils/token.util.js"

class PaymentController {
    async createPayment(req, res, next) {
        try {
            const {_id} = getTokenFromReq(req)
            const response = await checkoutService({user_id: _id})

            return res.json(response.url)
        } catch (error) {
            return next(error)
        }
    }
}

const paymentControllerInstance = new PaymentController()
export const { createPayment } = paymentControllerInstance