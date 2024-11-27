const express = require("express")
const cartController = require("../controllers/cart.controller")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const cartValidate = require("../validations/cart.validation")

const cartRouter = express.Router()

cartRouter.get("/", cartController.cartGet)
cartRouter.post('/',validationMiddleware(cartValidate), cartController.cartAdd)
cartRouter.delete("/:id", cartController.cartDelete)


module.exports = cartRouter