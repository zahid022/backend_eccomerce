const { Router } = require("express")
const bannerController = require("../controllers/banner.controller")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const bannerValidations = require("../validations/banner.validation")
const loginFunction = require("../midllwares/login")

const bannerRouter = Router()

bannerRouter.get("/tile", bannerController.getTile)
bannerRouter.post("/tile",loginFunction, validationMiddleware(bannerValidations.createTile), bannerController.createTile)
bannerRouter.delete("/tile/:id",loginFunction, bannerController.deletetile)

bannerRouter.get("/trend", bannerController.getTrend)
bannerRouter.post("/trend",loginFunction, validationMiddleware(bannerValidations.createTile), bannerController.createTrend)
bannerRouter.delete("/trend",loginFunction, bannerController.deleteTrend)

module.exports = bannerRouter