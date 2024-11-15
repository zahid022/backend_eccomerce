const express = require("express")
const { allProduct, byIdProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller")
const loginFunction = require("../midllwares/login")

const productRouter = express.Router()

productRouter.get("/", allProduct)
productRouter.get("/:id", byIdProduct)
productRouter.post("/", loginFunction, createProduct)
productRouter.patch("/:id", loginFunction, updateProduct)
productRouter.delete("/:id", loginFunction, deleteProduct)

module.exports = productRouter