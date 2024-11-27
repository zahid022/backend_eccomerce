const Joi = require("joi")

const brandValidate = Joi.object({
    name : Joi.string().min(3).required(),
    slug : Joi.string().min(3).required()
})

module.exports = brandValidate