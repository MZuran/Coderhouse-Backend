import Manager from "../manager.mongo.js";
import productModel from "../models/product.model.js";

const productManagerMongo = new Manager(productModel)

export default productManagerMongo