const express = require("express")
const { getComment, createComment, deleteComment } = require("../controllers/comment.controller")
const loginFunction = require("../midllwares/login")

const commentRouter = express.Router()

commentRouter.get("/:id", getComment)
commentRouter.post("/:id", loginFunction, createComment)
commentRouter.delete("/:id", loginFunction, deleteComment)

module.exports = commentRouter