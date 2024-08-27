import joi from "joi-oid";
import parseId from "../utils/parseId.util.js";

const cartsSchema = joi.object({
  user_id: joi.string().custom((value, helpers) => {
    const parsedId = parseId(value);
    if (!/^[0-9a-fA-F]{24}$/.test(parsedId)) {
      return helpers.error("any.invalid");
    }
    return parsedId;
  }).required().messages({
    "any.required": "User ID is required",
    "any.invalid": "User ID must be a valid 24-character hexadecimal string",
  }),
  product_id: joi.string().custom((value, helpers) => {
    const parsedId = parseId(value);
    if (!/^[0-9a-fA-F]{24}$/.test(parsedId)) {
      return helpers.error("any.invalid");
    }
    return parsedId;
  }).required().messages({
    "any.required": "Product ID is required",
    "any.invalid": "Product ID must be a valid 24-character hexadecimal string",
  }),
  state: joi.string().valid("reserved", "delivered").required().messages({
    "any.required": "State is required",
    "any.only": "State must be either 'reserved' or 'delivered'",
  }),
  quantity: joi.number().integer().min(1).required().messages({
    "any.required": "Quantity is required",
    "number.base": "Quantity must be a number",
    "number.integer": "Quantity must be an integer",
    "number.min": "Quantity must be at least 1",
  }),
});

export default cartsSchema;