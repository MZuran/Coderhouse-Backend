import FileManager from "./FileManager";
import Product from "../product.class.js";

class ProductManager extends FileManager {
  constructor() {
    super("./src/dao/fs/files/products.json");
  }

  async create(data) {
    return super.create(data, Product);
  }

  async readByCategory(category) {
    try {
      return await this.read({ category });
    } catch (error) {
      throw error;
    }
  }

  async readByTitle(title) {
    try {
      const allProducts = await this.read();
      const product = allProducts.find(product => product.title === title);

      if (!product) {
        console.error("Product not found with title:", title);
        return null;
      }

      return product;
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      // Ensure only valid properties are updated
      const validKeys = ['title', 'photo', 'category', 'price', 'stock'];
      const updatedData = {};
      
      for (let key of validKeys) {
        if (data[key] !== undefined && data[key] !== '') {
          updatedData[key] = data[key];
        }
      }
      
      return await super.update(id, updatedData);
    } catch (error) {
      throw error;
    }
  }
}

export const productManagerInstance = new ProductManager();
