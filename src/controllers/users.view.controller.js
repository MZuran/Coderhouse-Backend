import { getTokenFromReq } from "../utils/token.util.js";

import {
    createService,
    readService,
    paginateService,
    readOneService,
    updateService,
    destroyService,
} from "../services/users.service.js"


class UsersViewController {
    async usersView(req, res, next) {
        try {
            let user = getTokenFromReq(req,res)
            if (!user._id) {
                user = null
            }
            return res.render("users", { title: "Users", user });
        } catch (error) {
            next(error)
        }
    }

    async loginView(req, res, next) {
        try {
            return res.render("login", { title: "Log In" });
        } catch (error) {
            next(error)
        }
    }

    async registerView(req, res, next) {
        try {
            return res.render("register", { title: "Register" });
        } catch (error) {
            next(error)
        }
    }

    async editView(req, res, next) {
        try {
            const { uid } = req.params
            const user = await readOneService(uid)
            const { role } = getTokenFromReq(req,res)
            let isAdmin = role == 1
            console.log(user)
            return res.render("edit-user", { title: "Edit User", user: user, isAdmin });
        } catch (error) {
            next(error)
        }
    }
}

const usersViewController = new UsersViewController()
export const { usersView, loginView, registerView, editView } = usersViewController