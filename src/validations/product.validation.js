const Joi = require("joi")

const productValidate = Joi.object({
    name: Joi.string().min(3).required(),
    description: Joi.string().min(10).required(),
    price: Joi.number().greater(0).required(),
    discount: Joi.number().less(Joi.ref("price")).min(0).optional(),
    stock: Joi.number().greater(0).required(),
    size: Joi.array().items(Joi.string()).required(),
    color: Joi.array().items(Joi.string()).required(),
    img: Joi.array().items(Joi.string()).required(),
    tags : Joi.array().items(Joi.string()).required(),
    category_id: Joi.number().required(),
    brand_id: Joi.number().required(),
    sub_category_id: Joi.number().required()
})

const productUpdateValidate = Joi.object({
    name: Joi.string().min(3).optional(),
    description: Joi.string().min(10).optional(),
    price: Joi.number().greater(0).optional(),
    discount: Joi.number().min(0).optional().when("price", {
        is: Joi.exist(),
        then: Joi.number().less(Joi.ref("price")),
        otherwise: Joi.number().optional()
    }),
    stock: Joi.number().greater(0).optional(),
    size: Joi.array().items(Joi.string()).optional(),
    color: Joi.array().items(Joi.string()).optional(),
    img: Joi.array().items(Joi.string()).optional(),
    category_id: Joi.number().optional(),
    brand_id: Joi.number().optional(),
    sub_category_id: Joi.number().optional()
})

module.exports = {
    productValidate,
    productUpdateValidate
}