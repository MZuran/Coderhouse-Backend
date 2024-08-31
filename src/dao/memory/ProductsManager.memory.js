import fillProducts from "./fill/products.memory.fill.js";
import ManagerMemory from "./manager.memory.js";
import Product from "../product.class.js";

class ProductManager extends ManagerMemory {
}

const ProductManagerMem = new ProductManager()
fillProducts(ProductManagerMem)

export default ProductManagerMem