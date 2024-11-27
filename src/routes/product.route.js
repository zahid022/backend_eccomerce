const express = require("express")
const loginFunction = require("../midllwares/login")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const {productValidate, productUpdateValidate} = require('../validations/product.validation')
const productController = require("../controllers/product.controller")

const productRouter = express.Router()

productRouter.get("/", productController.allProduct)
productRouter.get("/:id", productController.byIdProduct)
productRouter.get("/category/:categoryId", productController.byCategoryIdProduct)
productRouter.get("/brand/:brandId", productController.byBrandIdProduct)
productRouter.get("/sub-category/:subCategoryId", productController.bySubCategoryIdProduct)
productRouter.post("/", loginFunction, validationMiddleware(productValidate), productController.createProduct)
productRouter.patch("/:id", loginFunction, validationMiddleware(productUpdateValidate), productController.updateProduct)
productRouter.delete("/:id", loginFunction, productController.deleteProduct)

module.exports = productRouter