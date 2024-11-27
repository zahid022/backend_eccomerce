const Joi = require("joi")

const commentValidate = Joi.object({
    content : Joi.string().min(2).required()
})

module.exports = commentValidate