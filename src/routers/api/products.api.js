import CustomRouter from "../customRouter.js";
import {read, readOne, create, update, destroy, readMe} from "../../controllers/products.controller.js"
import isProductPublisher from "../../middlewares/isProductPublisher.mid.js";

import validator from "../../utils/validator.joi.util.js";
import productsSchema from "../../schemas/product.schema.js";

class ProductsRouterClass extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], read);
        this.read("/me", ["PREM"], readMe);
        this.read("/:pid", ["PUBLIC"], readOne);
        this.create("/", ["ADMIN", "PREM"], validator(productsSchema), create);
        this.update("/:pid", ["ADMIN", "PREM"], isProductPublisher, update);
        this.destroy("/:pid", ["ADMIN", "PREM"], isProductPublisher, destroy);
    }
}

const productsRouter = new ProductsRouterClass()
export default productsRouter.getRouter()