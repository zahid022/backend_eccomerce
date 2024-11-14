const express = require("express")
const { allBrand, createBrand, deleteBrand, replaceBrand, updateBrand, byIdBrand } = require("../controllers/brand.controller")
const loginFunction = require("../midllwares/login")

const brandRouter = express.Router()

brandRouter.get("/", allBrand)

brandRouter.get("/:id", byIdBrand)

brandRouter.post("/", loginFunction, createBrand)

brandRouter.delete("/:id", loginFunction, deleteBrand)

brandRouter.put("/:id", loginFunction, replaceBrand)

brandRouter.patch("/:id", loginFunction, updateBrand)

module.exports = brandRouter