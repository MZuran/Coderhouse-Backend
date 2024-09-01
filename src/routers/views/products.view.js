import CustomRouter from "../customRouter.js";
import { productsView, productsViewOne, addProductsForm, productsViewMine, editOneProduct } from "../../controllers/products.view.controller.js"

import isVerified from "../../middlewares/isVerified.mid.js";

class productsViewRouterClass extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], productsView);
    this.read("/new", ["PREM", "ADMIN"], isVerified, addProductsForm);
    this.read("/me", ["PREM", "ADMIN"], isVerified, productsViewMine);
    this.read("/:nid", ["PUBLIC"], productsViewOne);
    this.read("/edit/:nid", ["PREM", "ADMIN"], isVerified, editOneProduct);
  }
}

const productsViewRouter = new productsViewRouterClass();
export default productsViewRouter.getRouter()