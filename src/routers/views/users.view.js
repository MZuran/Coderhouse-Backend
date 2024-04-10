import { Router } from "express";
import { userManagerInstance } from "../../data/fs/UserManager.fs.js";

export const usersViewRouter = Router();

usersViewRouter.get("/", usersView);


async function usersView(req, res, next) {
    try {
        const users = await userManagerInstance.read();
        return res.render("users", { title: "Users", users });
    } catch (error) {
        next(error)
    }
}