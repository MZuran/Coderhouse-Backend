import CustomRouter from "../customRouter.js";
import { read, readOne, create, update, destroy, updateByEmail } from "../../controllers/users.controller.js";
import isUserFromParams from "../../middlewares/isUserFromParams.mid.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], read);
    this.read("/:nid", ["ADMIN"], readOne);
    this.create("/", ["ADMIN"], create);
    this.update("/updateByEmail", ["ADMIN"], updateByEmail)
    this.update("/:uid", ["REGISTERED"], isUserFromParams, update);
    this.destroy("/:uid", ["REGISTERED"], isUserFromParams, destroy);
  }
}


const usersRouter = new UsersRouter()
export default usersRouter.getRouter();
