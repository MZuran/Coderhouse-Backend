import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import userManagerMongo from "../data/mongo/managers/userManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js"; 
//import { createToken } from "../utils/token.util.js";


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

                
                //.cookie("token", createToken(req.user), { signedCookie: true })
                return done(null, one)
            }

            const error = new Error('Invalid Credentials')
            error.statusCode = 401
            return done(error)
        } catch (error) {
            return done('error' + error)
        }
    }))

    passport.use(
        "google",
        new GoogleStrategy(
          {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/api/sessions/google/callback",
            passReqToCallback: true,
          },
          async (req, accessToken, refreshToken, profile, done) => {
            try {
              const { id, picture } = profile;
              console.log(profile);
              let user = await userManagerMongo.readByEmail(id);
              if (!user) {
                user = {
                  email: id,
                  password: createHash(id),
                  photo: picture,
                };
                user = await userManagerMongo.create(user);
              }
              req.session.email = user.email;
              req.session.online = true;
              req.session.role = user.role;
              req.session.photo = user.photo;
              req.session.user_id = user._id;
              return done(null, user);
            } catch (error) {
              return done(error);
            }
          }
        )
      );

export default passport