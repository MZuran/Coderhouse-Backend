import jwt from 'jsonwebtoken';
import { createToken, verifyToken } from "../utils/token.util.js";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';

import getBaseUrl from '../utils/baseUrl.util.js';
import parseId from '../utils/parseId.util.js';

import {
    createService,
    readService,
    paginateService,
    readOneService,
    updateService,
    destroyService,
    readByVerifyCodeService
} from "../services/users.service.js"

class SessionsController {
    async readSessions(req, res, next) {
        try {
            const data = await readOneService();
            return res.response200({ message: "Fetched Data", payload: data })
        } catch (error) {
            return next(error);
        }
    }

    async registerSession(req, res, next) {
        try {
            const data = req.body;
            await createService(data);
            return res.message201("Registered!")
        } catch (error) {
            return next(error);
        }
    }

    async verifyCode(req, res, next) {
        const { uid } = req.body

        if (!uid) {
            return res.error400("Invalid format!");
        }

        try {
            const one = await readByVerifyCodeService(uid);
            console.log("My readbyverify is", one)

            return res.response200({message: "Verified!"})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
        }
    };

    async loginSession(req, res, next) {
        try {
            //console.log("My req.user is", req.user)
            return res
                .cookie("token", createToken(req.user), { signedCookie: true })
                .response200({message: "Logged in!"});
        } catch (error) {
            return next(error);
        }
    }

    async checkOnlineStatus(req, res, next) {
        try {
            return res.json({
                statusCode: 100,
                baseUrl: getBaseUrl() || "Undefined",
                token: verifyToken(req.cookies['token']),
            });
        } catch (error) {
            return next(error);
        }
    }

    signOutSession(req, res, next) {
        try {
            res.clearCookie("token");
            //res.cookie("token", createToken({}), { signedCookie: true })
            console.log("Cleared token")
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

    async sendPasswordResetEmail(req, res, next) {
        try {
            // Extraer el email del cuerpo de la solicitud
            const { email } = req.body;

            // Buscar al usuario por su email
            let user = await readService({ email: email });
            user = user[0]
            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Generar el token
            const token = jwt.sign({ email: user.email }, process.env.SECRET_JWT, { expiresIn: '1h' });
            console.log("Generated token:", token);

            // Crear el enlace de restablecimiento de contraseña
            const resetLink = `${getBaseUrl()}/resetpassword?token=${token}`;

            // Crear un transportador
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "greengroceriesmarket@gmail.com",
                    pass: process.env.GOOGLE_PASSWORD,
                },
            });

            // Definir las opciones del correo electrónico
            const mailOptions = {
                from: "greengroceriesmarket@gmail.com",
                to: user.email,
                subject: "Password Reset",
                text: `Please click the link to reset your password: ${resetLink}`,
                html: `<p>Please click the link to reset your password: <a href="${resetLink}">Reset Password</a></p>`,
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("Error sending email:", error);
                    return res.status(500).json({ message: "Failed to send password reset email" });
                } else {
                    console.log("Email sent:", info.response);
                    return res.status(200).json({ message: "Password reset email sent!" });
                }
            });
        } catch (error) {
            console.error("Error in sendPasswordResetEmail:", error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async updatePassword(req, res, next) {
        const { token, newPassword } = req.body;

        // Validate the presence of token and newPassword
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password must be provided' });
        }

        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.SECRET_JWT);
            const email = decoded.email;

            // Find the user by email
            let user = await readService({ email: email });
            user = user[0]
            if (!user) {
                return res.status(400).json({ message: 'Invalid token or user does not exist' });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password
            user.password = hashedPassword;
            await updateService(user._id, user)

            res.status(200).json({ message: 'Password has been reset successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Invalid or expired token' });
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
        } catch (error) {
            next(error)
        }
    }
}

const sessionsController = new SessionsController();
const { 
    readSessions, 
    registerSession, 
    loginSession, 
    checkOnlineStatus, 
    signOutSession, 
    googleCallback, 
    updatePassword, 
    sendPasswordResetEmail, 
    verifyCode 
} = sessionsController;

export { 
    readSessions, 
    registerSession, 
    loginSession, 
    checkOnlineStatus, 
    signOutSession, 
    googleCallback, 
    updatePassword, 
    sendPasswordResetEmail, 
    verifyCode 
};