import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManagerMongo from "../data/mongo/managers/userManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js"; 

passport.use('register', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
},
    async (req, email, password, done) => {
        //const { email, password } = req.body;

        try {
            //Check if email or password are missing
            if (!email || !password) {
                const error = new Error("Please enter email and password!");
                error.statusCode = 400;
                throw error;
            }

            //Check if email is already used for another user
            const one = await userManagerMongo.readByEmail(email);
            if (one) {
                const error = new Error("Bad auth from register!");
                error.statusCode = 401;
                throw error;
            }

            //Hash the password
            const hashPassword = createHash(password);

            //Replace the password by the encrypted one
            req.body.password = hashPassword;

            //Create the user
            const user = await userManagerMongo.create(req.body)
            return done(null, user)
        } catch (error) {
            return done('error' + error)
        }
    }))

passport.use('login', new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'email'
},
    async (req, email, password, done) => {
        //const { email, password } = req.body;

        try {
            //Check if email or password are missing
            if (!email || !password) {
                const error = new Error("Please enter email and password!");
                error.statusCode = 400;
                throw error;
            }

            //Check if user with given email exists
            const one = await userManagerMongo.readByEmail(email);
            if (!one) {
                const error = new Error("Bad auth from login!");
                error.statusCode = 401;
                throw error;
            }

            //Validate password
            const verify = verifyHash(password, one.password)

            if (verify) {
                req.session.email = email;
                req.session.online = true;
                req.session.role = one.role;
                req.session.photo = one.photo;
                req.session.user_id = one._id;
                req.session.name = one.name;

                return done(null, one)
            }

            const error = new Error('Invalid Credentials')
            error.statusCode = 401
            return done(error)
        } catch (error) {
            return done('error' + error)
        }
    }))

export default passport