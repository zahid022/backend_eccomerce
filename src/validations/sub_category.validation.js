const Joi = require("joi")

const subCategoryValidate = Joi.object({
    name : Joi.string().min(3).required(),
    slug : Joi.string().min(3).required(),
    category_id : Joi.number().min(1).required()
})

module.exports = subCategoryValidate