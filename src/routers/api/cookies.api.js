import CustomRouter from "../customRouter.js";
import { setCookie, getCookies, destroyCookie, setSignedCookie, getSignedCookies } from "../../controllers/cookies.controller.js";

class cookiesRouterClass extends CustomRouter {
  init() {
    this.read("/set", ["PUBLIC"], setCookie);
    this.read("/", ["PUBLIC"], getCookies);
    this.read("/destroy/:cookie", ["PUBLIC"], destroyCookie);
    this.read("/signed", ["PUBLIC"], setSignedCookie);
    this.read("/get-signed", ["PUBLIC"], getSignedCookies);
  }
}

const cookiesRouter = new cookiesRouterClass();

export default cookiesRouter.getRouter();
