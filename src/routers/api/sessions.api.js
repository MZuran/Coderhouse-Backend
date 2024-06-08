import { Router } from "express";
import userManagerMongo from "../../data/mongo/managers/userManager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../customRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";

class sessionsRouterClass extends CustomRouter {
  init() {
    this.read("/", readSessions);
    this.create("/register", ["PUBLIC"], passport.authenticate("register", { session: false }), registerSession);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginSession);
    this.read("/online", ["PUBLIC"], checkOnlineStatus);
    this.create("/signout", ["USER"], signOutSession);
    this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), googleCallback);
  }
}
const sessionsRouter = new sessionsRouterClass();

async function readSessions(req, res, next) {
  try {
    const data = await userManagerMongo.read();
    return res.response200({message: "Fetched Data", payload: data})
  } catch (error) {
    return next(error);
  }
}

async function registerSession(req, res, next) {
  try {
    const data = req.body;
    await userManagerMongo.create(data);
    return res.message201("Registered!")
  } catch (error) {
    return next(error);
  }
}

async function loginSession(req, res, next) {
  try {
    //console.log("My req.user is", req.user)
    return res
      .cookie("token", req.user, { signedCookie: true })
      .response200("Logged in!");
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
        req_session: req.session
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

export default sessionsRouter.getRouter();
