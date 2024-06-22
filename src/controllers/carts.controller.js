import cartsManager from "../dao/mongo/managers/cartsManager.mongo.js";

class CartsController {
    async createCart(req, res, next) {
    try {
        const data = req.body;
        data.user_id = req.session.user_id;

        const list = await cartsManager.read({ user_id: data.user_id, product_id: data.product_id });
        const alreadyExistingCart = list[0]

        if (!alreadyExistingCart) {
            const one = await cartsManager.create(data);
            return res.json({
                statusCode: 201,
                message: "CREATED NEW CART",
                data: one
            })
        } else {
            const updatedOne = await cartsManager.update(alreadyExistingCart._id, { quantity: alreadyExistingCart.quantity + 1 })
            return res.json({
                statusCode: 201,
                message: "UPDATED EXISTING CART",
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
            const all = await cartsManager.read({ user_id });
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
        const updatedCart = await cartsManager.update(cid, { user_id, product_id, quantity, state });

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
        const remainingProducts = await cartsManager.destroy(cid);

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
        const userCartList = await cartsManager.read({ user_id: req.session.user_id });
        let idList = []

        userCartList.forEach(cart => {
            idList.push(cart._id)
        });

        idList.forEach(async id => {
            await cartsManager.destroy(id)
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
const {createCart, readCart, updateCart, deleteCart, deleteAllCarts} = cartsController
export {createCart, readCart, updateCart, deleteCart, deleteAllCarts}