import { Router } from "express";
import { userManagerInstance } from "../../data/fs/UserManager.fs.js";

export const usersViewRouter = Router();

usersViewRouter.get("/", usersView);
usersViewRouter.get("/login", loginView);
usersViewRouter.get("/register", registerView);


async function usersView(req, res, next) {
    try {
        const users = await userManagerInstance.read();
        return res.render("users", { title: "Users", users });
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