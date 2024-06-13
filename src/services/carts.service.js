import Service from "./service.js";
import cartsManager from "../data/mongo/managers/cartsManager.mongo.js";

const cartsService = new Service(cartsManager);
export const {
  createService,
  readService,
  readOneService,
  updateService,
  destroyService,
} = cartsService;