// CartsRepository.js
import dao from "../dao/dao.factory.js";
import CartsDTO from "../dto/carts.dto.js";
import BaseRepository from "./base.rep.js";

const { carts } = dao;

class CartsRepository extends BaseRepository {
  constructor() {
    super(carts, CartsDTO);
  }
}

const cartsRepository = new CartsRepository();
export default cartsRepository;
