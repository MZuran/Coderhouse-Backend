import ManagerMemory from "./manager.memory.js";

class Cart {
    constructor(user_id, product_id, quantity, state = "reserved") {
        this.user_id = user_id;
        this.product_id = product_id;
        this.quantity = quantity;
        this.state = state;
    }
}

class CartManager extends Manager {
    validateData(data) {
        // Ensure data contains user_id, product_id, quantity, and valid state
        const validStates = ["reserved", "paid", "delivered"];
        return (
            data.user_id &&
            data.product_id &&
            typeof data.quantity === "number" &&
            validStates.includes(data.state)
        );
    }
}

const CartManagerInstance = new CartManager()
export default CartManagerInstance