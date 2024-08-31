import Service from "./service.js";

import cartRepository from "../repositories/carts.rep.js";

const cartService = new Service(cartRepository);

export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = cartService;