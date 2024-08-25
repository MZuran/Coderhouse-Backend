import { getTokenFromReq } from "../../utils/token.util.js";
import CustomRouter from "../customRouter.js";

class usersViewRouterClass extends CustomRouter{
    init(){
        this.read("/", ["PUBLIC"], usersView);
        this.read("/login", ["PUBLIC"], loginView);
        this.read("/register", ["PUBLIC"], registerView);
    }
}

const usersViewRouter = new usersViewRouterClass();
export default usersViewRouter.getRouter()

async function usersView(req, res, next) {
    try {
        let user = getTokenFromReq(req)
        if (!user._id) {
            user = null
        }
        return res.render("users", { title: "Users", user });
    } catch (error) {
        next(error)
    }
}

async function loginView(req, res, next) {
    try {
        return res.render("login", { title: "Log In" });
    } catch (error) {
        next(error)
    }
}

async function registerView(req, res, next) {
    try {
        return res.render("register", { title: "Register" });
    } catch (error) {
        next(error)
    }
}