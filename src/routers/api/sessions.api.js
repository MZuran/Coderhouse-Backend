import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../customRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, sendPasswordResetEmail, updatePassword } from "../../controllers/sessions.controller.js"

class sessionsRouterClass extends CustomRouter {
  init() {
    this.read("/", readSessions);
    this.create("/register", ["PUBLIC"], passport.authenticate("register", { session: false }), registerSession);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginSession);
    this.create("/password", ["PUBLIC"], sendPasswordResetEmail);//revisar que este ok
    this.update("/password", ["USER", "ADMIN"], updatePassword); //y que esto tambien
    this.read("/online", ["USER", "ADMIN"], checkOnlineStatus);
    this.create("/signout", ["USER", "ADMIN"], signOutSession);
    this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), googleCallback);
  }
}
const sessionsRouter = new sessionsRouterClass();



export default sessionsRouter.getRouter();
