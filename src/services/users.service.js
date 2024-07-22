import Service from "./service.js";

import usersRepository from "../repositories/users.rep.js";

const usersService = new Service(usersRepository);

export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
} = usersService;