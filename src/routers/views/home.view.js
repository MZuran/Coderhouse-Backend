import CustomRouter from "../customRouter.js";
import { homePage } from "../../controllers/home.view.controller.js";

class HomeViewRouter extends CustomRouter {
    init() {
        this.read("/", ["PUBLIC"], homePage);
    }
}

const homeRouter = new HomeViewRouter();
export default homeRouter.getRouter()