import CustomRouter from "../customRouter.js";
import {read, readOne, create, update, destroy} from "../../controllers/products.controller.js"

class ProductsRouterClass extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], read);
        this.read("/:pid", ["PUBLIC"], readOne);
        this.create("/", ["ADMIN"], create);
        this.update("/:pid", ["ADMIN"], update);
        this.destroy("/:pid", ["ADMIN"], destroy);
    }
}

const productsRouter = new ProductsRouterClass()
export default productsRouter.getRouter()