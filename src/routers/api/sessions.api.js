import { Router } from "express";
import userManagerMongo from "../../data/mongo/managers/userManager.mongo.js";
import passport from "../../middlewares/passport.mid.js";

const sessionsRouter = Router();

sessionsRouter.get("/", readSessions);
sessionsRouter.post("/register", passport.authenticate("register", { session: false }), registerSession);
sessionsRouter.post("/login", passport.authenticate("login", { session: false }), loginSession);
sessionsRouter.get("/online", checkOnlineStatus);
sessionsRouter.post("/signout", signOutSession);
sessionsRouter.get("/google", passport.authenticate("google", { scope: ["email", "profile"] }));
sessionsRouter.get("/google/callback", passport.authenticate("google", { session: false }), googleCallback);

async function readSessions(req, res, next) {
  try {
    const data = await userManagerMongo.read();
    return res.json({ statusCode: 200, message: "Fetched Data", payload: data });
  } catch (error) {
    return next(error);
  }
}

async function registerSession(req, res, next) {
  try {
    const data = req.body;
    await userManagerMongo.create(data);
    return res.json({ statusCode: 201, message: "Registered!" });
  } catch (error) {
    return next(error);
  }
}

async function loginSession(req, res, next) {
  try {
    return res.json({ statusCode: 200, message: "Logged in!" });
  } catch (error) {
    return next(error);
  }
}

async function checkOnlineStatus(req, res, next) {
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
}

function signOutSession(req, res, next) {
  try {
    req.session.destroy();
    return res.json({ statusCode: 200, message: "Signed out!" });
  } catch (error) {
    return next(error);
  }
}

function googleCallback(req, res, next) {
  try {
    return res.json({ statusCode: 200, message: "Logged in with google!" });
  } catch (error) {
    return next(error);
  }
}

export default sessionsRouter;
