import CustomRouter from "../customRouter.js";
import {read, readOne, create, update, destroy, readMe} from "../../controllers/products.controller.js"

class ProductsRouterClass extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], read);
        this.read("/me", ["PREM"], readMe);
        this.read("/:pid", ["PUBLIC"], readOne);
        this.create("/", ["ADMIN"], create);
        this.update("/:pid", ["ADMIN", "PREM"], update);
        this.destroy("/:pid", ["ADMIN"], destroy);
    }
}

const productsRouter = new ProductsRouterClass()
export default productsRouter.getRouter()