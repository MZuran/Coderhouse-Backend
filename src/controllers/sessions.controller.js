import jwt from 'jsonwebtoken';
import { createToken, verifyToken } from "../utils/token.util.js";
import userManagerMongo from "../dao/mongo/managers/userManager.mongo.js";
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt';

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
            //const data = req.body;
            //await userManagerMongo.create(data);
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
        // Extraer el email del cuerpo de la solicitud
        const { email } = req.body;

        // Buscar al usuario por su email
        const user = await userManagerMongo.readByEmail( email );
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Generar el token
        const token = jwt.sign({ email: user.email }, process.env.SECRET_JWT, { expiresIn: '1h' });
        console.log("Generated token:", token);

        // Crear el enlace de restablecimiento de contraseña
        const resetLink = `http://localhost:${process.env.PORT}/resetpassword?token=${token}`;

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
        const user = await userManagerMongo.readByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid token or user does not exist' });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await userManagerMongo.update(user._id, user);

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
        }catch(error){
            next(error)
        }
    }
}

const sessionsController = new SessionsController();
const { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, updatePassword, sendPasswordResetEmail } = sessionsController;
export { readSessions, registerSession, loginSession, checkOnlineStatus, signOutSession, googleCallback, updatePassword, sendPasswordResetEmail };