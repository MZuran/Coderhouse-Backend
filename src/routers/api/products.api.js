import CustomRouter from "../customRouter.js";
import {read, readOne, create, update, destroy} from "../../controllers/products.controller.js"

class ProductsRouterClass extends CustomRouter {
    init() {
        this.read("/", read);
        this.read("/:pid", readOne);
        this.create("/", create);
        this.update("/:pid", update);
        this.destroy("/:pid", destroy);
    }
}

const productsRouter = new ProductsRouterClass()
export default productsRouter.getRouter()