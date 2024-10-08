import CustomRouter from "../customRouter.js";
import isUserFromParams from "../../middlewares/isUserFromParams.mid.js";

import { usersView, loginView, registerView, editView, verifyView } from "../../controllers/users.view.controller.js";

class usersViewRouterClass extends CustomRouter{
    init(){
        this.read("/", ["REGISTERED"], usersView);
        this.read("/login", ["PUBLIC"], loginView);
        this.read("/register", ["PUBLIC"], registerView);
        this.read("/verify/:uid", ["PUBLIC"], verifyView);
        this.read("/edit/:uid", ["REGISTERED"], isUserFromParams, editView);
    }
}

const usersViewRouter = new usersViewRouterClass();
export default usersViewRouter.getRouter()