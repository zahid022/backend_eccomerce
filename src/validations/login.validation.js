const Joi = require("joi")

const loginValidation = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(8).max(20).pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*()_+]+$')).required()
})

module.exports = loginValidation