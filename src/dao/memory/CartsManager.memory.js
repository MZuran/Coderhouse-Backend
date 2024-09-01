import ManagerMemory from "./manager.memory.js";

class Cart {
    constructor(user_id, product_id, quantity, state = "reserved") {
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.state = state;
    }
}

class CartManager extends ManagerMemory {
}

const CartManagerInstance = new CartManager()
export default CartManagerInstance