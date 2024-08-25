import CustomRouter from "../customRouter.js";

class resetPasswordViewRouterClass extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], resetPasswordView);
  }
}

async function resetPasswordView(req, res, next) {
    try {
        const token = req.query.token;
        const email = req.query.email;

        if (!token) {
            return res.status(400).send('Token is missing');
        }

        return res.render("reset-password", { title: "Reset your password", token, email });
    } catch (error) {
        next(error);
    }
}

const resetPasswordViewRouter = new resetPasswordViewRouterClass();
export default resetPasswordViewRouter.getRouter()