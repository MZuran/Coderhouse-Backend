import { Router } from "express";

const cookiesRouter = Router();

cookiesRouter.get("/set", setCookie);
cookiesRouter.get("/", getCookies);
cookiesRouter.get("/destroy/:cookie", destroyCookie);
cookiesRouter.get("/signed", setSignedCookie);
cookiesRouter.get("/get-signed", getSignedCookies);

function setCookie(req, res, next) {
  try {
    return res
      .cookie("online", "true", { maxAge: 60 * 60 * 1000 })
      .json({ message: "Cookie will expire in one hour" });
  } catch (error) {
    return next(error);
  }
}

function getCookies(req, res, next) {
  try {
    const cookies = req.cookies;
    const online = req.cookies.online;
    return res.json({ cookies, online });
  } catch (error) {
    return next(error);
  }
}

function destroyCookie(req, res, next) {
  try {
    const { cookie } = req.params;
    return res
      .clearCookie(cookie)
      .json({ message: "cookie " + cookie + " removed" });
  } catch (error) {
    return next(error);
  }
}

function setSignedCookie(req, res, next) {
  try {
    return res
      .cookie("role", "admin", { signed: true })
      .json({ message: "Cookie signed with user role" });
  } catch (error) {
    return next(error);
  }
}

function getSignedCookies(req, res, next) {
  try {
    return res.json({ message: req.signedCookies });
  } catch (error) {
    return next(error);
  }
}

export default cookiesRouter;
