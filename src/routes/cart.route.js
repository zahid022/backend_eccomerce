const express = require("express")
const { cartGet, cartAdd, cartDelete } = require("../controllers/cart.controller")

const cartRouter = express.Router()

cartRouter.get("/", cartGet)
cartRouter.post('/', cartAdd)
cartRouter.delete("/:id", cartDelete)


module.exports = cartRouter