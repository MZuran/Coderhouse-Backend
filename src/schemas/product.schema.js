import joi from "joi-oid";
import parseId from "../utils/parseId.util.js";

const productsSchema = joi.object({
  title: joi.string().min(3).max(100).required().messages({
    "any.required": "Title is required",
    "string.empty": "Title cannot be an empty string",
    "string.base": "Title must be a string",
    "string.min": "Title must have at least 3 characters",
    "string.max": "Title must have at most 100 characters",
  }),
  category: joi.string().valid('fruit', 'vegetable').required().messages({
    "any.required": "Category is required",
    "string.empty": "Category cannot be an empty string",
    "string.base": "Category must be a string",
    "any.only": "Category must be either 'fruit' or 'vegetable'",
  }),
  price: joi.number().min(0).required().messages({
    "any.required": "Price is required",
    "number.base": "Price must be a number",
    "number.min": "Price must be at least 0",
  }),
  stock: joi.number().integer().min(0).required().messages({
    "any.required": "Stock is required",
    "number.base": "Stock must be a number",
    "number.integer": "Stock must be an integer",
    "number.min": "Stock must be at least 0",
  }),
  photo: joi.string().uri().messages({
    "string.uri": "Photo must be a valid URI",
  }),
  /*
  supplier_id: joi.string().custom((value, helpers) => {
    const parsedId = parseId(value);
    if (!/^[0-9a-fA-F]{24}$/.test(parsedId)) {
      return helpers.error("any.invalid");
    }
    return parsedId;
  }).required().messages({
    "any.required": "Supplier ID is required",
    "any.invalid": "Supplier ID must be a valid 24-character hexadecimal string",
  }),
  */
});

export default productsSchema;
