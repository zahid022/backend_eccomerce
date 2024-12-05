const { Router } = require("express")
const bannerController = require("../controllers/banner.controller")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const bannerValidations = require("../validations/banner.validation")
const loginFunction = require("../midllwares/login")

const bannerRouter = Router()

bannerRouter.get("/tile", bannerController.getTile)
bannerRouter.post("/tile",loginFunction, validationMiddleware(bannerValidations.createTile), bannerController.createTile)
bannerRouter.delete("/tile/:id",loginFunction, bannerController.deletetile)


module.exports = bannerRouter