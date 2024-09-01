import CustomRouter from "../customRouter.js";
import { createPayment } from "../../controllers/payment.controller.js";

import isVerified from '../../middlewares/isVerified.mid.js'

class PaymentRouterClass extends CustomRouter {
  init() {
    this.create("/checkout", ["REGISTERED"], isVerified, createPayment);
  }
}

const paymentRouter = new PaymentRouterClass();

export default paymentRouter.getRouter();