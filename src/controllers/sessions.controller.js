import { createToken, verifyToken } from "../utils/token.util.js";
import userManagerMongo from "../dao/mongo/managers/userManager.mongo.js";
import nodemailer from "nodemailer";

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
            // Example code using nodemailer library
            
            // Create a transporter
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "greengroceriesmarket@gmail.com",
                    pass: "2x1enpapas",
                },
            });
            
            // Define the email options
            const mailOptions = {
                from: "greengroceriesmarket@gmail.com",
                to: email,
                subject: "Password Reset",
                text: "Please click the link to reset your password.",
                html: "<p>Please click the link to reset your password.</p>",
            };
            
            // Send the email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending email:", error);
                    return res.response500({ message: "Failed to send password reset email" });
                } else {
                    console.log("Email sent:", info.response);
                    return res.response200({ message: "Password reset email sent!" });
                }
            });
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
    

    async update(req, res, next) {
        try {
            const { title, photo, category, price, stock } = req.body;
            const { pid } = req.params;
            const updatedProduct = await updateService(pid, { title, photo, category, price, stock });
    
            res.status(200).json({
                message: "Product updated successfully",
                product: updatedProduct,
            });
        }catch(error){
            next(error)
        }
    }
}

const sessionsController = new SessionsController();
const { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, updatePassword, sendPasswordResetEmail } = sessionsController;
export { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, updatePassword, sendPasswordResetEmail };