import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

const persistence = argsUtil.persistence;

class CartsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = String(data.user_id);
    this.product_id = String(data.product_id);;
    this.state = data.state === "delivered" ? "delivered" : "reserved"; // Default to "reserved" if not "delivered"
    this.quantity = Math.max(1, data.quantity || 1); // Ensure quantity is a positive number
  }
}

export default CartsDTO;
