import { Router } from "express";
import { verifyToken } from "../utils/token.util.js";
import userManagerMongo from "../dao/mongo/managers/userManager.mongo.js";
import winstonErrorMessage from "../utils/winstonMessage.util.js";

class CustomRouter {
    /*-----------Setup-----------*/
    constructor() {
        this.router = Router()
        this.init()
    }

    getRouter() { return this.router }

    init() { }

    applyCbs(callbacks) {
        return callbacks.map(callback => async (...params) => {
            try { await callback.apply(this, params) }
            catch (error) { return params[2](error) }
        })
    }

    /*-----------Endpoints-----------*/
    create(path, policies, ...callbacks) {
        this.router.post(path, this.response, this.policies(policies), this.applyCbs(callbacks))
    }

    read(path, policies, ...callbacks) {
        this.router.get(path, this.response, this.policies(policies), this.applyCbs(callbacks))
    }

    destroy(path, policies, ...callbacks) {
        this.router.delete(path, this.response, this.policies(policies), this.applyCbs(callbacks))
    }

    update(path, policies, ...callbacks) {
        this.router.put(path, this.response, this.policies(policies), this.applyCbs(callbacks))
    }

    use(path, ...callbacks) {
        this.router.use(path, this.response, this.applyCbs(callbacks))
    }

    /*-----------Responses-----------*/
    response = (req, res, next) => {
        res.response200 = (response) => { res.json({ statuscode: 200, response }) }
        res.paginate = (response, info) => { res.json({ statuscode: 200, response, info }) }
        res.message201 = (message) => res.json({ statusCode: 201, message });
        res.error400 = (message) => winstonErrorMessage(req, res, { statusCode: 400, message });
        res.error401 = () => winstonErrorMessage(req, res, { statusCode: 401, message: "Bad Auth" });
        res.error403 = () => winstonErrorMessage(req, res, { statusCode: 403, message: "Forbidden" });
        res.error404 = () => winstonErrorMessage(req, res, { statusCode: 404, message: "Not Found" });
        res.error500 = () => winstonErrorMessage(req, res, { statusCode: 500, message: "Internal Server Error" });
        return next()
    }

    /*-----------Policies-----------*/
    policies = (policies) => async (req, res, next) => {
        if (policies.includes('PUBLIC')) return next()

        let token = req.cookies['token']
        if (!token) return res.error401()

        try {
            const { role, email } = verifyToken(token)
            console.log("The role is", role)
            console.log("The policies are", policies)
            if (
                policies.includes('USER') && role === 0 ||
                policies.includes('ADMIN') && role === 1
                //Add more here if needed
            ) {
                const user = await userManagerMongo.readByEmail(email)
                req.user = user
                return next()
            } else {
                return res.error401()
            }
        } catch (error) {
            return res.error401()
        }
    }
}

export default CustomRouter;