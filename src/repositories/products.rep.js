// ProductsRepository.js
import dao from "../dao/dao.factory.js";
import ProductsDTO from "../dto/products.dto.js";
import BaseRepository from "./base.rep.js";
const { products } = dao;

class ProductsRepository extends BaseRepository {
  constructor() {
    super(products, ProductsDTO);
  }
}

const productsRepository = new ProductsRepository();
export default productsRepository;
