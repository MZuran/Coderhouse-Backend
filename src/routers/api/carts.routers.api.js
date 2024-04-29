import { Router, response } from "express";
import cartsManager from "../../data/mongo/managers/cartsManager.mongo.js";

const cartRouter = Router();

cartRouter.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await cartsManager.create(data);
    return res.json({
      statusCode: 201,
      message: "CREATED NEW CART",
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});
cartRouter.get("/", async (req, res, next) => {
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
});
export default cartRouter;
