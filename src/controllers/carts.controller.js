import { getTokenFromReq } from "../utils/token.util.js";

import {
    createService,
    readService,
    paginateService,
    readOneService,
    updateService,
    destroyService,
} from "../services/carts.service.js"

class CartsController {
    async createCart(req, res, next) {
        try {
            const data = req.body;
            const { _id } = getTokenFromReq(req,res)

            console.log("My id is", _id)

            const list = await readService({ user_id: _id, product_id: data.product_id });
            const alreadyExistingCart = list[0]
            console.log(list)

            if (!alreadyExistingCart) {
                const one = await createService({ user_id: _id, product_id: data.product_id, quantity: Number(data.quantity) });
                return res.json({
                    statusCode: 201,
                    message: "Added a new Item to Cart!",
                    data: one
                })
            } else {
                const updatedOne = await updateService(alreadyExistingCart._id, { user_id: _id, product_id: data.product_id, quantity: alreadyExistingCart.quantity + Number(data.quantity) })
                return res.json({
                    statusCode: 201,
                    message: "Updated Cart!",
                    data: updatedOne
                })
            }
        } catch (error) {
            return next(error);
        }
    }

    async readCart(req, res, next) {
        try {
            const { user_id } = req.query;
            if (user_id) {
                const all = await readService({ user_id });
                if (all.length > 0) {
                    return res.json({
                        statusCode: 200,
                        message: "READ CART",
                        response: all,
                    });
                }
            }
            const error = new Error("NOT FOUND");
            error.statusCode = 404;
            throw error;
        } catch (error) {
            return next(error);
        }
    }

    async updateCart(req, res, next) {
        try {
            const { user_id, product_id, quantity, state } = req.body;
            const { cid } = req.params;
            const updatedCart = await updateService(cid, { user_id, product_id, quantity, state });

            res.status(200).json({
                message: "Cart updated successfully",
                product: updatedCart,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteCart(req, res, next) {
        try {
            const { cid } = req.params;
            console.log("My cid is", cid)
            const remainingProducts = await destroyService(cid);

            res.status(200).json({
                message: "Product deleted successfully",
                product: remainingProducts,
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteAllCarts(req, res, next) {
        try {
            const { _id } = getTokenFromReq(req,res)
            const userCartList = await readService({ user_id: _id });
            let idList = []

            userCartList.forEach(cart => {
                idList.push(cart._id)
            });

            idList.forEach(async id => {
                await destroyService(id)
            });

            res.status(200).json({
                message: "Carts deleted successfully",
                idList: idList
            });
        } catch (error) {
            next(error);
        }
    }

}

const cartsController = new CartsController()
const { createCart, readCart, updateCart, deleteCart, deleteAllCarts } = cartsController
export { createCart, readCart, updateCart, deleteCart, deleteAllCarts }