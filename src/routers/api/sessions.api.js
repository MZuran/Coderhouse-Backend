import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../customRouter.js";
import passportCb from "../../middlewares/passportCb.mid.js";

import { 
  readSessions, 
  registerSession, 
  loginSession, 
  checkOnlineStatus, 
  signOutSession, 
  googleCallback, 
  sendPasswordResetEmail, 
  updatePassword,
  verifyCode
} from "../../controllers/sessions.controller.js"

import validator from "../../utils/validator.joi.util.js";
import usersSchema from "../../schemas/user.schema.js";

class sessionsRouterClass extends CustomRouter {
  init() {
    this.read("/", readSessions);
    this.create("/register", ["PUBLIC"], validator(usersSchema), passportCb("register"), registerSession);
    this.create("/login", ["PUBLIC"], passportCb("login"), loginSession);

    this.read("/password", ["PUBLIC"], sendPasswordResetEmail);
    this.create("/password", ["PUBLIC"], sendPasswordResetEmail);

    this.create("/reset-password", ["PUBLIC"], updatePassword);
    this.create("/verify", ["PUBLIC"], verifyCode);

    this.read("/online", ["REGISTERED"], checkOnlineStatus);

    this.create("/signout", ["REGISTERED"], signOutSession);
    this.read("/google", ["PUBLIC"], passport.authenticate("google", { scope: ["email", "profile"] }));
    this.read("/google/callback", ["PUBLIC"], passport.authenticate("google", { session: false }), googleCallback);
  }
}
const sessionsRouter = new sessionsRouterClass();



export default sessionsRouter.getRouter();
