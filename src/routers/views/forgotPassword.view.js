import CustomRouter from "../customRouter.js";

class forgotPasswordViewRouterClass extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], forgotPasswordView);
  }
}

async function forgotPasswordView(req, res, next) {
    try {
        return res.render("forgotpassword", { title: "Forgot password?" });
    } catch (error) {
        next(error)
    }
}

const forgotPasswordViewRouter = new forgotPasswordViewRouterClass();
export default forgotPasswordViewRouter.getRouter()