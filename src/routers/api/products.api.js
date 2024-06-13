import CustomRouter from "../customRouter.js";
import { create, read, readOne, update, destroy } from "../../controllers/products.controller.js";
import isTitle from "../../middlewares/isTitle.mid.js";
import isValidAdmin from "../../middlewares/isValidAdmin.mid.js";

class ProductsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], isValidAdmin, isTitle, create);
    this.update("/:nid", ["ADMIN"], update);
    this.destroy("/:nid", ["ADMIN"], destroy);
  }
}

const productsRouter = new ProductsRouter();
export default productsRouter.getRouter();