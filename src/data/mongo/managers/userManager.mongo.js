import Manager from "../manager.mongo.js";
import userModel from "../models/user.model.js";

const userManagerMongo = new Manager(userModel)

export default userManagerMongo