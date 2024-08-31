// AuthRepository.js
import dao from "../dao/dao.factory.js";
import UsersDTO from "../dto/users.dto.js";
import BaseRepository from "./base.rep.js";

const { users } = dao;

class AuthRepository extends BaseRepository {
  constructor() {
    super(users, UsersDTO);
  }

  readByEmail = async (email) => {
    try {
      const result = await this.model.readByEmail(email);
      return result;
    } catch (error) {
      throw error;
    }
  };
}

const authRepository = new AuthRepository();
export default authRepository;
