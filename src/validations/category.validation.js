const Joi = require("joi")

const categoryValidate = Joi.object({
    name : Joi.string().min(3).required(),
    slug : Joi.string().min(3).required()
})

module.exports = categoryValidate