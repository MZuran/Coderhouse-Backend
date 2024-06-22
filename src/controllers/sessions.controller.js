import { createToken } from "../utils/token.util.js";
import userManagerMongo from "../data/mongo/managers/userManager.mongo.js";

class SessionsController {
    async readSessions(req, res, next) {
        try {
            const data = await userManagerMongo.read();
            return res.response200({ message: "Fetched Data", payload: data })
        } catch (error) {
            return next(error);
        }
    }

    async registerSession(req, res, next) {
        try {
            const data = req.body;
            await userManagerMongo.create(data);
            return res.message201("Registered!")
        } catch (error) {
            return next(error);
        }
    }

    async loginSession(req, res, next) {
        try {
            //console.log("My req.user is", req.user)
            return res
                .cookie("token", createToken(req.user), { signedCookie: true })
                .response200("Logged in!");
        } catch (error) {
            return next(error);
        }
    }

    async checkOnlineStatus(req, res, next) {
        try {
            if (req.session.online) {
                return res.json({
                    statusCode: 200,
                    message: "Is online!",
                    user_id: req.session.user_id,
                    req_session: req.session
                });
            }
            return res.json({
                statusCode: 401,
                message: "Bad auth!",
            });
        } catch (error) {
            return next(error);
        }
    }

    signOutSession(req, res, next) {
        try {
            req.session.destroy();
            res.clearCookie("token");
            return res.json({ statusCode: 200, message: "Signed out!" });
        } catch (error) {
            return next(error);
        }
    }

    googleCallback(req, res, next) {
        try {
            return res.json({ statusCode: 200, message: "Logged in with google!" });
        } catch (error) {
            return next(error);
        }
    }
}

const sessionsController = new SessionsController();
const { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback } = sessionsController;
export { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback };