const Joi = require("joi")


const createTile = Joi.object({
    image : Joi.string().trim().required(),
    name : Joi.string().trim().required(),
    href : Joi.string().trim().required()
})

const bannerValidations = {
    createTile
}

module.exports = bannerValidations