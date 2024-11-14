const express = require("express")
const { allCategory, byIdCategory, createCategory, deleteCategory, updateCategory, allSubCategory, byIdSubCategory, createSubCategory, deleteSubCategory, updateSubCategory } = require("../controllers/category.controller")
const loginFunction = require("../midllwares/login")

const categoryRouter = express.Router()

categoryRouter.get("/subcategory", allSubCategory)
categoryRouter.get("/subcategory/:id", byIdSubCategory)
categoryRouter.post("/subcategory", loginFunction, createSubCategory)
categoryRouter.patch("/subcategory/:id", loginFunction, updateSubCategory)
categoryRouter.delete("/subcategory/:id", loginFunction, deleteSubCategory)

categoryRouter.get("/", allCategory)
categoryRouter.get("/:id", byIdCategory)
categoryRouter.post("/", loginFunction, createCategory)
categoryRouter.put("/:id", loginFunction, updateCategory)
categoryRouter.delete("/:id", loginFunction, deleteCategory)


module.exports = categoryRouter