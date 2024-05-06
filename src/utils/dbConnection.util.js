import { connect } from "mongoose";

async function dbConnection() {
    try {
        await connect(process.env.MONGO_URI)
    } catch(error) {
        console.log(error)
    }
}

export default dbConnection