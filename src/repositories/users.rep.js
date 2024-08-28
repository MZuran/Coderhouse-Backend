// UsersRepository.js
import dao from "../dao/dao.factory.js";
import UsersDTO from "../dto/users.dto.js";
import BaseRepository from "./base.rep.js";

const { users } = dao;

class UsersRepository extends BaseRepository {
  constructor() {
    super(users, UsersDTO);
  }

  readByEmail = async (email) => {
    try {
      const result = await this.model.findOne({ email: email });
      return result;
    } catch (error) {
      throw error;
    }
  };
}

const usersRepository = new UsersRepository();
export default usersRepository;
