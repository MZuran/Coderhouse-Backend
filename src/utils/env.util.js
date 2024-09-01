import { config } from "dotenv";
import args from "./args.util.js";

const { env } = args

//Make sure it's a valid enviroment file type
const path = env === "prod" ? "./.env.prod" : "./.env.dev";
config({ path });

const enviroment = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI,
    SESSION_KEY: process.env.SESSION_KEY,
    COOKIE_KEY: process.env.COOKIE_KEY,
    GEN_SALT_VAL: process.env.GEN_SALT_VAL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    SECRET_JWT: process.env.SECRET_JWT,
    GOOGLE_EMAIL: process.env.GOOGLE_EMAIL,
    GOOGLE_PASSWORD: process.env.GOOGLE_PASSWORD,
    SERVER_URL: process.env.SERVER_URL
}

export default enviroment