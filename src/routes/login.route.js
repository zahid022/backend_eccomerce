const express = require("express")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const loginValidation = require("../validations/login.validation")
const loginController = require("../controllers/login.controller")

const loginRouter = express.Router()

loginRouter.post("/signup", validationMiddleware(loginValidation), loginController.signUp)
loginRouter.post("/signin",validationMiddleware(loginValidation), loginController.signin)
loginRouter.post("/signout", loginController.signOut)

module.exports = loginRouter