import {
    createService,
    readService,
    readOneService,
    updateService,
    destroyService,
} from "../services/products.service.js";

import { verifyToken, getTokenFromReq } from "../utils/token.util.js";
import parseId from "../utils/parseId.util.js";

class ProductsController {
    init() {
        this.defaultImageValue = "https://t4.ftcdn.net/jpg/00/84/13/15/360_F_84131506_fV8Szg1O5j9wB2ORZR6hxSv5PNCPIw0o.jpg"
    }

    async read(req, res, next) {
        try {
            const { category } = req.query;
            let token = req.cookies['token']
            let _id, role, productList

            console.log(`My category is ${category}`)
            console.log(req.query)

            if (token) {
                role = verifyToken(token).role
                _id = verifyToken(token)._id
            }

            console.log(`The token is ${verifyToken(token)}`)
            console.log(`My role is ${role} and my id is ${_id}`)

            //If it's a premium user
            if (role && _id && role == 2) {
                if (category) {
                    productList = await readService({ supplier_id: { $ne: _id }, category: category })

                } else {
                    productList = await readService({ supplier_id: { $ne: _id } })

                }
            } else {
                productList = await readService(category);
            }

            if (productList.length !== 0) {
                return res.status(200).json({
                    length: productList.length,
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


    async readMe(req, res, next) {
        try {
            let token = req.cookies['token']
            const { _id } = verifyToken(token)
            const productList = await readService({ supplier_id: _id })

            return res.status(200).json({
                response: productList,
                products: productList.length
            })

        } catch (error) {
            next(error)
        }
    }
    async readOne(req, res, next) {
        try {
            const { pid } = req.params;
            const productList = await readOneService(pid);
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

    async create(req, res, next) {
        try {
            const { title, photo = this.defaultImageValue, category, price = 1, stock = 1, supplier_id } = req.body
            if (!title) {
                const error = new Error("Missing Title");
                error.statusCode = 400; // Bad request
                throw error;
            }
            if (!category) {
                const error = new Error("Missing Category!");
                error.statusCode = 400; // Bad request
                throw error;
            }
            if (!supplier_id) {
                const error = new Error("Missing Supplier Id!")
                error.statusCode = 400
                throw error
            }

            const newProduct = await createService({ title, photo, category, price, stock, supplier_id })

            res.status(201).json({
                message: "Product created successfully",
                product: newProduct,
            });

        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            const { _id, role } = getTokenFromReq(req)
            const { pid } = req.params;

            if (role == 1) {
                //The request comes from an admin
                const { title, photo, category, price, stock, supplier_id } = req.body;
                const updatedProduct = await updateService(pid, { title, photo, category, price, stock, supplier_id });

                res.status(200).json({
                    message: "Product updated successfully",
                    product: updatedProduct,
                });
            }

            const originalProduct = await readOneService(pid)
            const isOwner = (parseId(originalProduct.supplier_id) === _id)

            if (isOwner && role == 2) {
                //Premium user that owns the product (CANNOT CHANGE SUPPLIER ID)
                const { title, photo, category, price, stock } = req.body;
                const updatedProduct = await updateService(pid, { title, photo, category, price, stock });

                res.response200({
                    message: "Product updated successfully",
                    product: updatedProduct,
                })
            } else {
                res.error401()
            }

        } catch (error) {
            next(error)
        }
    }

    async destroy(req, res, next) {
        try {
            const { pid } = req.params;

            const remainingProducts = await destroyService(pid);

            res.status(200).json({
                message: "Product deleted successfully",
                product: remainingProducts,
            });
        } catch (error) {
            next(error)
        }
    }
}

const productsController = new ProductsController()
export const { read, readOne, create, update, destroy, readMe } = productsController