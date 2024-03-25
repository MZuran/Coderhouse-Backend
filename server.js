import express from "express"
import { fruitManager } from "./data/fs/ProductsManager.fs.js"

const port = 8080
const ready = () => console.log("Server Running on port " + port);

const server = express()

server.listen(port, ready)

server.use(express.urlencoded({ extended: true }))

server.get("/api/products", async (req, res) => {
    try {
        const { category } = req.query
        const productList = await fruitManager.read(category)
        if (productList.length !== 0) {
            return res.status(200).json({
                response: productList,
                statusCode: res.statusCode
            })
        } else {
            const error = new Error("No matching Products")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            statusCode: error.statusCode
        })
    }
})

server.get("/api/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params
        const productList = await fruitManager.readOne(pid)
        if (productList.length !== 0) {
            return res.status(200).json({
                response: productList,
                statusCode: res.statusCode
            })
        } else {
            const error = new Error("No matching Products")
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        console.log(error);
        return res.status(error.statusCode).json({
            response: error.message,
            statusCode: error.statusCode
        })
    }
})