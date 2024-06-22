import CustomRouter from "../customRouter.js";
import { read, readOne, create, update, destroy } from "../../controllers/users.controller.js";

class UsersRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], read);
    this.read("/:nid", ["PUBLIC"], readOne);
    this.create("/", ["ADMIN"], create);
    this.update("/:nid", ["ADMIN"], update);
    this.destroy("/:nid", ["ADMIN"], destroy);
  }
}


const usersRouter = new UsersRouter()
export default usersRouter.getRouter();
