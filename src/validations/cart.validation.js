const Joi = require("joi")

const cartValidate = Joi.object({
    product_id : Joi.number().min(1).required(),
    count : Joi.number().min(1).required()
})

module.exports = cartValidate