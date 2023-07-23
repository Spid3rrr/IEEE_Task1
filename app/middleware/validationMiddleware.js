const Joi = require("joi");

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    const errorMessage = error.details
      .map((detail) => detail.message)
      .join(", ");
    return res.status(400).json({ error: errorMessage });
  }
  next();
};

const userSchema = Joi.object({
  username: Joi.string().min(6).required().messages({
    "string.min.base": "Username must be at least 6 characters long",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter and one number",
    }),
});

const userUpdateSchema = Joi.object({
  username: Joi.string().min(6).messages({
    "string.min.base": "Username must be at least 6 characters long",
  }),
  password: Joi.string()
    .pattern(/^(?=.*[a-zA-Z])(?=.*[0-9])/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one letter and one number",
    }),
});

module.exports = {
  validateUser: validate(userSchema),
    validateUserUpdate: validate(userUpdateSchema),
};
