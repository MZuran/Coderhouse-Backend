import { connect } from "mongoose";
import enviroment from "./env.util.js";

async function dbConnection() {
    try {
        await connect(enviroment.MONGO_URI)
    } catch(error) {
        console.log(error)
    }
}

export default dbConnection