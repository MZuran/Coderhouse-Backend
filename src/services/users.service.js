import Service from "./service.js";

import usersRepository from "../repositories/users.rep.js";

class UsersServiceClass extends Service{
  readByVerifyCodeService = async (code) => {
    try {
      const one = await this.repository.readByVerifyCode(code);
      return one;
    } catch (error) {
      throw error;
    }
  };
}

const usersService = new UsersServiceClass(usersRepository);

export const {
  createService,
  readService,
  paginateService,
  readOneService,
  updateService,
  destroyService,
  readByVerifyCodeService,
  readByEmailService
} = usersService;