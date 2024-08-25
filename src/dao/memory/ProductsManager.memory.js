import fillProducts from "./fill/products.memory.fill.js";
import ManagerMemory from "./manager.memory.js";

class Product {
    constructor(title, photo, category, price, stock) {
        this.title = title;
        this.photo = photo;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }
}

class ProductManager extends ManagerMemory {
    validateData(data) {
        return data instanceof Product;
    }
}

const ProductManagerMem = new ProductManager()
fillProducts(ProductManagerMem)

export default ProductManagerMem