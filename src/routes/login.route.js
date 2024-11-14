const express = require("express")
const { signUp, signin, signOut } = require("../controllers/login.controller")

const loginRouter = express.Router()

loginRouter.post("/signup", signUp)
loginRouter.post("/signin", signin)
loginRouter.post("/signout", signOut)

module.exports = loginRouter