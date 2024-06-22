
import userManagerMongo from "../dao/mongo/managers/userManager.mongo.js";

class UserController {
    async read(req, res, next) {
        try {
            const { role } = req.query;
            const all = await userManagerMongo.read(role);
            if (all.length !== 0) {
                return res.status(200).json({
                    response: all,
                    role,
                    success: true,
                });
            } else {
                const error = new Error("ERROR 404 NOT FOUND");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    }

    async readOne(req, res, next) {
        try {
            const { nid } = req.params;
            const one = await userManagerMongo.readOne(nid);
            if (one) {
                return res.status(200).json({
                    response: one,
                    success: true,
                });
            } else {
                const error = new Error("ERROR 404 NOT FOUND");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            return next(error);
        }
    }

    async create(req, res, next) {
        try {
            const data = req.body;
            const one = await userManagerMongo.create(data);
            return res.json({
                statusCode: 201,
                message: "User created with id: " + one._id,
            });
        } catch (error) {
            return next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { nid } = req.params;
            const data = req.body;
            const one = await userManagerMongo.update(nid, data);
            return res.json({
                statusCode: 200,
                message: "User modified with id: " + one.id,
                response: one,
            });
        } catch (error) {
            return next(error);
        }
    }

    async destroy(req, res, next) {
        try {
            const { nid } = req.params;
            const one = await userManagerMongo.destroy(nid);
            return res.json({
                statusCode: 200,
                message: "User deleted with id: " + nid,
                response: one,
            });
        } catch (error) {
            return next(error);
        }
    }
}

const userController = new UserController()
export const {read, readOne, create, update, destroy} = userController