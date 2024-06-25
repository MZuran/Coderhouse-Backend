import { config } from "dotenv";
import args from "./args.util.js";

const { env } = args
let path = ''

//Make sure it's a valid enviroment file type
switch (env) {
    case 'prod':
    case 'dev':
        path = `./env.${env}`
    break;

    default:
        path = `./env.dev`
    break;
}

config(path)

const enviroment = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_KEY: process.env.SESSION_KEY,
    COOKIE_KEY: process.env.COOKIE_KEY,
    GEN_SALT_VAL: process.env.GEN_SALT_VAL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SECRET_JWT: process.env.SECRET_JWT
}

export default enviroment