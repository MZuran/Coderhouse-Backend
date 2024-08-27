import argsUtil from "../utils/args.util.js";
import crypto from "crypto";
import { ObjectId } from "mongodb"; // Assuming you have mongodb installed and want to use ObjectId

const persistence = argsUtil.persistence;

class CartsDTO {
  constructor(data) {
    persistence !== "mongo" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.user_id = persistence === "mongo" ? new ObjectId() : crypto.randomBytes(12).toString("hex");
    this.product_id = persistence === "mongo" ? new ObjectId() : crypto.randomBytes(12).toString("hex");
    this.state = data.state === "delivered" ? "delivered" : "reserved"; // Default to "reserved" if not "delivered"
    this.quantity = Math.max(1, data.quantity || 1); // Ensure quantity is a positive number
    persistence !== "mongo" && (this.createdAt = new Date());
    persistence !== "mongo" && (this.updatedAt = new Date());
  }
}

export default CartsDTO;
