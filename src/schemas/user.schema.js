import joi from "joi-oid";

const usersSchema = joi.object({
  name: joi.string().min(3).max(50).required().messages({
    "any.required": "Name is required",
    "string.empty": "Name cannot be an empty string",
    "string.base": "Name must be a string",
    "string.min": "Name must have at least 3 characters",
    "string.max": "Name must have at most 50 characters",
  }),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .min(3)
    .max(50)
    .required()
    .messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be an empty string",
      "string.email": "Email must be valid",
      "string.min": "Email must have at least 3 characters",
      "string.max": "Email must have at most 50 characters",
    }),
  password: joi.string()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@.]+$'))
    .min(3)
    .max(50)
    .required()
    .messages({
      "any.required": "Password is required",
      "string.empty": "Password cannot be an empty string",
      "string.pattern.base": "Password must contain at least one lowercase letter, one uppercase letter, one number, and can include '.' or '@'",
      "string.min": "Password must have at least 3 characters",
      "string.max": "Password must have at most 50 characters",
    }),
  photo: joi.string().uri().allow(null).optional().messages({
    "string.uri": "Photo must be a valid URI",
    "string.base": "Photo must be a string or null",
  }),
  role: joi.number().integer().min(0).max(4).messages({
    "number.base": "Role must be a number",
    "number.min": "Role must be at least 0",
    "number.max": "Role must be at most 4",
  }),
  verify: joi.boolean().messages({
    "boolean.base": "Verification field must be true or false",
  }),
  verifyCode: joi.string().optional().messages({
    "string.base": "Verification code must be a string",
  }),
});

export default usersSchema;
