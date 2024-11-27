const categoryService = require("../services/category.service")
const subCategoryService = require("../services/sub_category.service")

const allSubCategory = async (req, res) => {
    try {
        let data = await subCategoryService.allSubCategory()

        res.json(data)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

const byIdSubCategory = async (req, res) => {
    const { id } = req.params

    try {
        let data = await subCategoryService.byIdSubCategory(id)
        res.json(data)
    } catch (err) {
        res.status(404).json({ error: err.message })
    }
}

const createSubCategory = async (req, res) => {
    const { body } = req

    try {
        await categoryService.byIdCategory(body.category_id)
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }

    try {
        let data = await subCategoryService.createSubCategory(body)

        res.json({ message: "sub-category created successfully", data })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}

const updateSubCategory = async (req, res) => {
    const { id } = req.params
    const { body } = req

    try {
        await subCategoryService.byIdSubCategory(id)
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }

    try {
        await categoryService.byIdCategory(body.category_id)
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }

    try {
        let data = await subCategoryService.updateSubCategory(body, id)

        res.json({ message: "Sub-category updated successfully", data })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteSubCategory = async (req, res) => {
    const { id } = req.params

    try {
        await subCategoryService.byIdSubCategory(id)
    } catch (err) {
        return res.status(404).json({ error: err.message })
    }

    try {
        await subCategoryService.deleteSubCategory(id)
        res.json({ message: "sub-category deleted successfully" })
    } catch (err) {
        res.json(400).json({error : err.message})
    }
}


const subCategoryController = {
    allSubCategory,
    byIdSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}

module.exports = subCategoryController