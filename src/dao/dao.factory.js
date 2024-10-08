import argsUtil from "../utils/args.util.js";
import dbConnect from "../utils/dbConnection.util.js";

const persistence = argsUtil.persistence;
let dao = {};

switch (persistence) {
  case "memory":
    console.log("connected to memory");
    const { default: productsManagerMem } = await import( "./memory/ProductsManager.memory.js" );
    const { default: usersManagerMem } = await import( "./memory/UserManager.memory.js" );
    const { default: cartsManagerMem } = await import( "./memory/CartsManager.memory.js" );
    dao = {
      users: usersManagerMem,
      products: productsManagerMem,
      carts: cartsManagerMem
    };
    break;
  case "fs":
    console.log("connected to file system");
    const { default: productsManagerFs } = await import( "./fs/ProductsManager.fs.js" );
    const { default: usersManagerFs } = await import("./fs/UserManager.fs.js");
    const { default: cartsManagerFs } = await import("./fs/CartsManager.fs.js");
    dao = {
      users: usersManagerFs,
      products: productsManagerFs,
      carts: cartsManagerFs
    };
    break;
  default:
    console.log("connected to database");
    dbConnect();
    const { default: productsManagerMongo } = await import( "./mongo/managers/productManager.mongo.js" );
    const { default: usersManagerMongo } = await import( "./mongo/managers/userManager.mongo.js" );
    const { default: cartsManagerMongo } = await import( "./mongo/managers/cartsManager.mongo.js" );
    dao = {
      users: usersManagerMongo,
      products: productsManagerMongo,
      carts: cartsManagerMongo
    };
    break;
}

export default dao;