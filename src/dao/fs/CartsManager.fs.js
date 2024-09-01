import FileManager from "./FileManager";

class Cart {
  constructor(user_id, product_id, quantity, state = "reserved") {
    this.user_id = user_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.state = state;
  }
}

class CartsManager extends FileManager {
  constructor() {
    super("./src/dao/fs/files/carts.json");
  }

  async create(data) {
    return super.create(data, Cart);
  }

  async readByUserId(user_id) {
    try {
      return await this.read({ user_id });
    } catch (error) {
      throw error;
    }
  }

  async readByProductId(product_id) {
    try {
      return await this.read({ product_id });
    } catch (error) {
      throw error;
    }
  }

  async update(id, data) {
    try {
      // Ensure only valid properties are updated
      const validKeys = ['user_id', 'product_id', 'quantity', 'state'];
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

  async destroy(id) {
    try {
      return await super.destroy(id);
    } catch (error) {
      throw error;
    }
  }
}

const cartsManagerInstance = new CartsManager();
export default cartsManagerInstance