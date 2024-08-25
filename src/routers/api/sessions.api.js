import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../customRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";
import { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, sendPasswordResetEmail, updatePassword } from "../../controllers/sessions.controller.js"

class sessionsRouterClass extends CustomRouter {
  init() {
    this.read("/", readSessions);
    this.create("/register", ["PUBLIC"], passportCb("register"), registerSession);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginSession);

    this.read("/password", ["PUBLIC"], sendPasswordResetEmail);
    this.create("/password", ["PUBLIC"], sendPasswordResetEmail);
    //this.update("/password", ["USER", "ADMIN", "PREM"], updatePassword); //y que esto tambi

    this.read("/online", ["USER", "ADMIN", "PREM"], checkOnlineStatus);//WORKS
    
    this.create("/signout", ["USER", "ADMIN", "PREM"], signOutSession);
    this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), googleCallback);
  }
}
const sessionsRouter = new sessionsRouterClass();



export default sessionsRouter.getRouter();
