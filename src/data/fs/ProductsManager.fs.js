import fs from "fs";
import crypto from "crypto";

//crypto.randomBytes(12).toString("hex")
class ProductManager {
    static #products = [];
    constructor() {
        this.path = "./src/data/fs/files/products.json"
        this.init()
    }

    init() {
        const exists = fs.existsSync(this.path)
        if (!exists) {
            const stringData = JSON.stringify([], null, 2)
            fs.writeFileSync(this.path, stringData)
        } else {
            //console.log("Archivo existente")
        }
    }

    async create(data) {
        try {
            const productsList = await this.read()
            const assignedId = crypto.randomBytes(12).toString("hex")

            if ((data instanceof Product || haveSameProps(new Product, data)) && hasValidProps(data)) {
                productsList.push({ ...data, id: assignedId })
                this.writeToFile(productsList)
                console.log("Product successfully added to the list")
            } else {
                const error = new Error("Invalid Product")
                console.log(data)
                throw error
            }

        } catch (error) {
            throw error
        }
    }
    async read(category) {
        try {
            let productFileData = await fs.promises.readFile(this.path, "utf-8")
            productFileData = JSON.parse(productFileData)
            if (category) { productFileData = productFileData.filter(product => product.category === category) }
            return productFileData
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

    async update(id, data) {
        try {
            let productList = await this.read()
            let updatedProduct = await this.readOne(id)
            const {title, photo, category, price, stock} = data

            title && title !== "" ? updatedProduct.title = title : null
            photo && photo !== "" ? updatedProduct.photo = photo : null
            category && category !== "" ? updatedProduct.category = category : null
            price && price !== "" ? updatedProduct.price = price : null
            stock && stock !== "" ? updatedProduct.stock = stock : null

            for (let i = 0; i < productList.length; i++) {
                if (productList[i].id == id) {
                    productList[i] = updatedProduct
                }
            }

            await this.writeToFile(productList)
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
class Product {
    constructor(title, photo, category, price, stock) {
            this.title = title,
            this.photo = photo,
            this.category = category,
            this.price = price,
            this.stock = stock
    }
}

function hasValidProps(obj) {
    const values = Object.values(obj)
    const invalidValues = values.filter(value => value == null || value == undefined || value == '').length
    return invalidValues == 0
}

function haveSameProps(objA, objB) {
    const propertyA = Object.getOwnPropertyNames(objA).sort()
    const propertyB = Object.getOwnPropertyNames(objB).sort()
    return JSON.stringify(propertyA) == JSON.stringify(propertyB)
}

export const fruitManager = new ProductManager();