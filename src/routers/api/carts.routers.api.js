import { Router } from "express";
import cartsManager from "../../data/mongo/managers/cartsManager.mongo.js";

const cartRouter = Router();

cartRouter.post("/", createCart);
cartRouter.get("/", readCart);
cartRouter.put("/:cid", updateCart);
cartRouter.delete("/:cid", deleteCart);

async function createCart(req, res, next) {
  try {
    const data = req.body;
    data.user_id = req.session.user_id;

    const list = await cartsManager.read({user_id: data.user_id, product_id: data.product_id});
    const alreadyExistingCart = list[0]

    if (!alreadyExistingCart) {
      const one = await cartsManager.create(data);
      return res.json({
        statusCode: 201,
        message: "CREATED NEW CART",
        data: one
      })
    } else { 
      const updatedOne = await cartsManager.update(alreadyExistingCart._id, {quantity: alreadyExistingCart.quantity + 1})
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

async function readCart(req, res, next) {
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

async function updateCart(req, res, next) {
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

async function deleteCart(req, res, next) {
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

export default cartRouter;
