const express = require("express")
const loginFunction = require("../midllwares/login")
const brandController = require("../controllers/brand.controller")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const brandValidate = require("../validations/brand.validation")

const brandRouter = express.Router()

brandRouter.get("/", brandController.allBrand)

brandRouter.get("/:id", brandController.byIdBrand)

brandRouter.post("/", loginFunction, validationMiddleware(brandValidate), brandController.createBrand)

brandRouter.delete("/:id", loginFunction, brandController.deleteBrand)

brandRouter.put("/:id", loginFunction, validationMiddleware(brandValidate), brandController.replaceBrand)

module.exports = brandRouter