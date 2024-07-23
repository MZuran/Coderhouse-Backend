import { createToken, verifyToken } from "../utils/token.util.js";
import userManagerMongo from "../dao/mongo/managers/userManager.mongo.js";

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
            return res.json({
                statusCode: 100,
                message: "Testing",
                token: verifyToken(req.cookies['token'])
            });
        } catch (error) {
            return next(error);
        }
    }

    signOutSession(req, res, next) {
        try {
            res.clearCookie("token");
            //res.cookie("token", createToken({}), { signedCookie: true })
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
// tarea sprint 12 revisar que este ok
    async sendPasswordResetEmail(req, res, next) {
        try {
            const { email } = req.body;
            // Code to send password reset email
            return res.response200({ message: "Password reset email sent!" });
        } catch (error) {
            return next(error);
        }
    }

    async updatePassword(req, res, next) {
        try {
            const { email, password } = req.body;
            // Code to update password
            return res.response200({ message: "Password updated!" });
        } catch (error) {
            return next(error);
        }
    }
// fin tarea sprint 12

}

const sessionsController = new SessionsController();
const { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, updatePassword, sendPasswordResetEmail } = sessionsController;
export { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, updatePassword, sendPasswordResetEmail };