import { Router } from "express";
import userManagerMongo from "../../data/mongo/managers/userManager.mongo.js";

import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

sessionsRouter.get(
  "/",
  async (req, res, next) => {
    try {
      const data = await userManagerMongo.read();
      return res.json({ statusCode: 200, message: "Fetched Data", payload: data });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res, next) => {
    try {
      const data = req.body;
      await userManagerMongo.create(data);
      return res.json({ statusCode: 201, message: "Registered!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 200, message: "Logged in!" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get("/online", async (req, res, next) => {
  try {
    if (req.session.online) {
      return res.json({
        statusCode: 200,
        message: "Is online!",
        user_id: req.session.user_id,
      });
    }
    return res.json({
      statusCode: 401,
      message: "Bad auth!",
    });
  } catch (error) {
    return next(error);
  }
});
sessionsRouter.post("/signout", (req, res, next) => {
  try {
    req.session.destroy();
    return res.json({ statusCode: 200, message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
});

export default sessionsRouter;