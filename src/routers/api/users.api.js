import CustomRouter from "../customRouter.js";
import { read, readOne, create, update, destroy, updateByEmail } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["ADMIN"], read);
    this.read("/:nid", ["ADMIN"], readOne);
    this.create("/", ["ADMIN"], create);
    this.update("/updateByEmail", ["ADMIN"], updateByEmail)
    this.update("/:nid", ["ADMIN"], update);
    this.destroy("/:nid", ["ADMIN"], destroy);
  }
}


const usersRouter = new UsersRouter()
export default usersRouter.getRouter();
