import Service from "./service.js";

import productsRepository from "../repositories/products.rep.js";

const productsService = new Service(productsRepository);

export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = productsService;