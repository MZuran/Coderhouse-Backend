import { Router } from "express";
import { fruitManager } from "../../data/fs/ProductsManager.fs.js";
import productManagerMongo from "../../data/mongo/managers/productManager.mongo.js";

const selectedManager = productManagerMongo
const productsRouter = Router();

productsRouter.get("/", read);
productsRouter.get("/:pid", readOne);
productsRouter.post("/", create);
productsRouter.put("/:pid", update);
productsRouter.delete("/:pid", destroy);

async function read(req, res, next) {
    try {
        const { category } = req.query;
        const productList = await selectedManager.read(category);
        if (productList.length !== 0) {
            return res.status(200).json({
                response: productList,
                statusCode: res.statusCode,
            });
        } else {
            const error = new Error("No matching Products");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        next(error)
    }
}

async function readOne(req, res, next) {
    try {
        const { pid } = req.params;
        const productList = await selectedManager.readOne(pid);
        if (productList.length !== 0) {
            return res.status(200).json({
                response: productList,
                statusCode: res.statusCode,
            });
        } else {
            const error = new Error("No matching Products");
            error.statusCode = 404;
            throw error;
        }
    } catch (error) {
        console.log(error);
        next(error)
    }
}

const defaultImageValue = "https://t4.ftcdn.net/jpg/00/84/13/15/360_F_84131506_fV8Szg1O5j9wB2ORZR6hxSv5PNCPIw0o.jpg"
async function create(req, res, next) {
    try {
        const {title, photo = defaultImageValue, category = "default", price = 1, stock = 1} = req.body
        if (!title) {
            const error = new Error("Missing Title");
            error.statusCode = 400; // Bad request
            throw error;
        }

        const newProduct = await selectedManager.create({title,photo,category,price,stock})

        res.status(201).json({
            message: "Product created successfully",
            product: newProduct,
        });

    } catch (error) {
        next(error)
    }
}

async function update(req, res, next) {
    try {
        const { title, photo, category, price, stock } = req.body;
        const { pid } = req.params;
        const updatedProduct = await selectedManager.update(pid, { title, photo, category, price, stock });

        res.status(200).json({
            message: "Product updated successfully",
            product: updatedProduct,
        });
    }catch(error){
        next(error)
    }
}

async function destroy(req, res, next) {
    try {
        const { pid } = req.params;

        const remainingProducts = await selectedManager.destroy(pid);

        res.status(200).json({
            message: "Product deleted successfully",
            product: remainingProducts,
        });
    }catch(error){
        next(error)
    }
}

export default productsRouter;