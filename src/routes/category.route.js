const express = require("express")
const loginFunction = require("../midllwares/login")
const categoryController = require("../controllers/category.controller")
const { validationMiddleware } = require("../midllwares/validation.middleware")
const categoryValidate = require("../validations/category.validation")
const subCategoryController = require("../controllers/sub_category.controller")
const subCategoryValidate = require("../validations/sub_category.validation")

const categoryRouter = express.Router()

categoryRouter.get("/subcategory", subCategoryController.allSubCategory)
categoryRouter.get("/subcategory/:id", subCategoryController.byIdSubCategory)
categoryRouter.get("/subcategory/cat/:id", subCategoryController.byCategorySub)
categoryRouter.post("/subcategory", loginFunction, validationMiddleware(subCategoryValidate), subCategoryController.createSubCategory)
categoryRouter.put("/subcategory/:id", loginFunction, validationMiddleware(subCategoryValidate), subCategoryController.updateSubCategory)
categoryRouter.delete("/subcategory/:id", loginFunction, subCategoryController.deleteSubCategory)

categoryRouter.get("/", categoryController.categories)
categoryRouter.get("/:id", categoryController.byIdCategory)
categoryRouter.post("/", loginFunction, validationMiddleware(categoryValidate), categoryController.createCategory)
categoryRouter.put("/:id", loginFunction, validationMiddleware(categoryValidate), categoryController.updateCategory)
categoryRouter.delete("/:id", loginFunction, categoryController.deleteCategory)


module.exports = categoryRouter