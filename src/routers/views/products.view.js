import CustomRouter from "../customRouter.js";
import { productsView, productsViewOne, addProductsForm, productsViewMine, editOneProduct } from "../../controllers/products.view.controller.js"

class productsViewRouterClass extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], productsView);
    this.read("/new", ["PREM", "ADMIN"], addProductsForm);
    this.read("/me", ["PREM", "ADMIN"], productsViewMine);
    this.read("/:nid", ["PUBLIC"], productsViewOne);
    this.read("/edit/:nid", ["PREM", "ADMIN"], editOneProduct);
  }
}

const productsViewRouter = new productsViewRouterClass();
export default productsViewRouter.getRouter()