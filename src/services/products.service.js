import Service from "./service.js";
import productsManager from "../data/mongo/managers/productManager.mongo.js";

const productsService = new Service(productsManager);
export const { createService, readService, readOneService, updateService, destroyService } = productsService;