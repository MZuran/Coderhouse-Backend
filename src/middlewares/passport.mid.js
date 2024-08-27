import enviroment from "../utils/env.util.js";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import dao from "../dao/dao.factory.js";

import { createHash, verifyHash } from "../utils/hash.util.js";
import sendEmail from "../utils/mailing.util.js";

passport.use('register', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email'
},
  async (req, email, password, done) => {
    try {
      if (!email || !password) {
        const error = new Error("Please enter email and password!");
        error.statusCode = 400;
        return done(null, null, error);
      }

      //Check if email is already used for another user
      const one = await dao.users.readByEmail(email);
      if (one) {
        const error = new Error("Email already in use!");
        error.statusCode = 409;
        return done(null, null, error);
      }

      const hashPassword = createHash(password);
      req.body.password = hashPassword;

      let photo = req.body.photo
      if (!photo || photo == null) {req.body.photo = "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0="}

      const user = await dao.users.create(req.body);
      /*
      await sendEmail({
        to: email,
        name: user.name,
      });
      */
      return done(null, user);
    } catch (error) {
      return done('error' + error);
    }
  }
));

passport.use('login', new LocalStrategy({
  passReqToCallback: true,
  usernameField: 'email'
},
  async (req, email, password, done) => {
    try {
      if (!email || !password) {
        const error = new Error("Please enter email and password!");
        error.statusCode = 400;
        return done(null, null, error);
      }

      //Check if user with given email exists
      const one = await dao.users.readByEmail(email);
      if (!one) {
        const error = new Error("Bad auth from login!");
        error.statusCode = 401;
        return done(null, null, error);
      }

      const verify = verifyHash(password, one.password);
      if (verify) {
        delete one.password;
        return done(null, one);
      }

      const error = new Error('Invalid Credentials');
      error.statusCode = 401;
      return done(error);
    } catch (error) {
      return done('error' + error);
    }
  }
));

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: enviroment.GOOGLE_CLIENT_ID,
      clientSecret: enviroment.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { id, picture } = profile;
        console.log(profile);
        let user = await dao.users.readByEmail(id);
        if (!user) {
          user = {
            email: id,
            password: createHash(id),
            photo: picture,
          };
          user = await dao.users.create(user);
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

export default passport;