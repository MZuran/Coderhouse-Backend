import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnect.util.js";

const persistence = argsUtil.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: productsManagerMem } = await import(
      "./memory/ProductsManager.memory.js"
    );
    const { default: usersManagerMem } = await import(
      "./memory/UserManager.memory.js"
    );
    dao = {
      users: usersManagerMem,
      products: productsManagerMem,
    };
    break;
  case "fs":
    console.log("connected to file system");
    const { default: productsManagerFs } = await import(
      "./fs/ProductsManager.fs.js"
    );
    const { default: usersManagerFs } = await import("./fs/UserManager.fs.js");
    dao = {
      users: usersManagerFs,
      products: productsManagerFs,
    };
    break;
  default:
    console.log("connected to database");
    dbConnect();
    const { default: productsManagerMongo } = await import(
      "./mongo/ProductsManager.mongo.js"
    );
    const { default: usersManagerMongo } = await import(
      "./mongo/UserManager.mongo.js"
    );
    dao = {
      users: usersManagerMongo,
      products: productsManagerMongo,
    };
    break;
}

export default dao;