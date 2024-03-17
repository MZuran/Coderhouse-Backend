const fs = require("fs")
const crypto = require("crypto");

//crypto.randomBytes(12).toString("hex")
class ProductManager {
    static #products = [];
    constructor() {
        this.path = "./data/fs/files/products.json"
        this.init()
    }

    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
        } else {
            console.log("Archivo existente")
        }
    }

    async create(data) {
        try {
            const productsList = await this.read()
            const assignedId = crypto.randomBytes(12).toString("hex")

            if (data instanceof Product) {
                productsList.push({ ...data, id: assignedId })
                this.writeToFile(productsList)
                console.log("Product successfully added to the list")
            } else { console.error("Wrong product format"); }

        } catch (error) {
            throw error
        }
    }

    async read() {
        try {
            const productFileData = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(productFileData)
        } catch (error) {
            throw error
        }
    }

    async readOne(id) {
        try {
            const productList = await this.read()
            const parsedList = productList.filter(product => product.id === id)

            if (parsedList.length > 1) { return console.error("ERROR: REPEATED ID") }
            return parsedList[0]
        } catch (error) {
            throw error
        }
    }

    async destroy(id) {
        try {
            const productList = await this.read()
            const parsedList = productList.filter(product => product.id != id)
            this.writeToFile(parsedList)
            return parsedList
        } catch (error) {
            throw error
        }
    }

    //Auxiliary Methods
    writeToFile(data) {
        const parsedData = JSON.stringify(data, null, 2)
        fs.writeFileSync(this.path, parsedData)
    }
}
//************************************************************
const urls = {
    banana: "https://acdn.mitiendanube.com/stores/001/219/229/products/banana1-39d62a544fc16a2b8016025979095295-640-0.jpg",
    apple: "https://static.libertyprim.com/files/varietes/pomme-dalinette-large.jpg?1589283082",
    carrot: "https://cdn11.bigcommerce.com/s-kc25pb94dz/images/stencil/1280x1280/products/271/762/Carrot__40927.1634584458.jpg?c=2",
    potato: "https://m.media-amazon.com/images/I/313dtY-LOEL._AC_UF1000,1000_QL80_.jpg",
    tomato: "https://i5.walmartimages.com/seo/Fresh-Slicing-Tomato-Each_a1e8e44a-2b82-48ab-9c09-b68420f6954c.04f6e0e87807fc5457f57e3ec0770061.jpeg",
    grapes: "https://reimagineco.ca/cdn/shop/products/Untitleddesign-100_750x810.png?v=1667752249",
    orange: "https://www.heddensofwoodtown.co.uk/wp-content/uploads/2020/05/oranges_opt.jpg",
    broccoli: "https://cdn.britannica.com/25/78225-050-1781F6B7/broccoli-florets.jpg",
    corn: "https://static.vecteezy.com/system/resources/previews/009/887/201/non_2x/sweet-corn-free-png.png",
    watermelon: "https://i5.walmartimages.com/asr/a83e3e11-9128-4d98-8f6f-8c144e0d8e5e.a5fafdef89b7430bd13cae9037294d87.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF"
}

class Product {
    constructor(title, photo, category, price, stock) {
        this.title = title,
            this.photo = photo,
            this.category = category,
            this.price = price,
            this.stock = stock
    }
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

async function test() {
    fruitManager.create(watermelon);

    /* const list = await fruitManager.read()
    console.log(list) */

    /* const searchedList = await fruitManager.readOne("9ded38c6c3e0b797d1068d36")
    console.log(searchedList) */

    //fruitManager.destroy("c1f29f16edab6c14c21e8a30")
}

test()