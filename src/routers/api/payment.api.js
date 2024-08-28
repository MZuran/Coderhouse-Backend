import CustomRouter from "../customRouter.js";
import { createPayment } from "../../controllers/payment.controller.js";

//TODO: Only allow verified users here

class PaymentRouterClass extends CustomRouter {
  init() {
    this.create("/", ["REGISTERED"], createPayment);
  }
}

const paymentRouter = new PaymentRouterClass();

export default paymentRouter.getRouter();