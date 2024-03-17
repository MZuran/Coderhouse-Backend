const crypto = require("crypto");

class Product {
    constructor(title, photo, category, price, stock) {
        this.title = title,
            this.photo = photo,
            this.category = category,
            this.price = price,
            this.stock = stock
    }
}

class ProductManager {
    static #products = [];
    create(data) {
        const productsLength = ProductManager.#products.length

        const assignedId = crypto.randomBytes(12).toString("hex")

        if (data instanceof Product) {
            ProductManager.#products.push({ ...data, id: assignedId })
            console.log("Product successfully added to the list")
        } else {
            console.error("Wrong product format");
        }
    }

    read() {
        return ProductManager.#products;
    }

    readOne(id) {
        const productList = ProductManager.#products
        const parsedList = productList.filter(product => product.id === id)

        if (parsedList.length > 1) { return console.error("ERROR: REPEATED ID") }
        return parsedList[0]
    }

    destroy(id) {
        const productList = ProductManager.#products
        const parsedList = productList.filter(product => product.id != id)
        ProductManager.#products = parsedList
        return parsedList
    }
}

const urls = {
    banana: "https://acdn.mitiendanube.com/stores/001/219/229/products/banana1-39d62a544fc16a2b8016025979095295-640-0.jpg",
    apple: "https://static.libertyprim.com/files/varietes/pomme-dalinette-large.jpg?1589283082",
    carrot: "https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/271/762/Carrot__40927.1634584458.jpg?c=2",
    potato: "https://m.media-amazon.com/images/I/313dtY-LOEL._AC_UF1000,1000_QL80_.jpg",
    tomato: "https://i5.walmartimages.com/seo/Fresh-Slicing-Tomato-Each_a1e8e44a-2b82-48ab-9c09-b68420f6954c.04f6e0e87807fc5457f57e3ec0770061.jpeg"
}

const fruitManager = new ProductManager();

const banana = new Product("banana", urls.banana, "fruit", 10, 200)
const apple = new Product("apple", urls.apple, "fruit", 8, 47)
const carrot = new Product("carrot", urls.carrot, "vegetable", 11, 20)
const potato = new Product("potato", urls.potato, "vegetable", 9, 400)
const tomato = new Product("tomato", urls.tomato, "fruit", 8, 50)
const grapes = new Product("grapes", urls.grapes, "fruit", 12.5, 32)
const orange = new Product("orange", urls.orange, "fruit", 14, 70)
const broccoli = new Product("broccoli", urls.broccoli, "vegetable", 9, 130)
const corn = new Product("corn", urls.corn, "vegetable", 17, 221)
const watermelon = new Product("watermelon", urls.watermelon, "fruit", 20, 54)

fruitManager.create(banana);
fruitManager.create(apple);
fruitManager.create(carrot);
fruitManager.create(potato);
fruitManager.create(tomato);
fruitManager.create(grapes);
fruitManager.create(orange);
fruitManager.create(broccoli);
fruitManager.create(corn);
fruitManager.create(watermelon);
console.log(fruitManager.read())