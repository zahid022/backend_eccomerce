const express = require("express")
const commentController = require("../controllers/comment.controller")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const commentValidate = require("../validations/comment.validation")

const commentRouter = express.Router()

commentRouter.get("/:id", commentController.getComment)
commentRouter.post("/:id",validationMiddleware(commentValidate), commentController.createComment)
commentRouter.delete("/:id", commentController.deleteComment)

module.exports = commentRouter