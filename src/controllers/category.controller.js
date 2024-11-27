const categoryService = require("../services/category.service")

const categories = async (req, res) => {
    try {
        const data = await categoryService.categories()
        res.json(data)  
    } catch (err) {
        res.status(400).json({error : err.message})
    }
    
}

const byIdCategory = async (req, res) => {
    const { id } = req.params

    try {
        let data = await categoryService.byIdCategory(id)
        res.json(data)
    } catch (err) {
        res.status(404).json({error : err.message})
    }

}

const createCategory = async (req, res) => {
    const {body} = req

    try {
        let data = await categoryService.createCategory(body)
        res.json({message : "Category created successfully", data})
    } catch (err) {
        res.status(400).json({error : err.message})
    }
}

const updateCategory = async (req, res) => {
    const { id } = req.params

    const {body} = req

    try {
        await categoryService.byIdCategory(id)
    } catch (err) {
        return res.status(404).json({error : err.message})
    }


    try {
        let data = await categoryService.updateCategory(body, id)

        res.json({message : "category is updated successfully", data})
    } catch (err) {
        res.status(400).json({error: "Category update is failed"})
    }
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    try {
        await categoryService.byIdCategory(id)
    } catch (err) {
        return res.status(404).json({error : err.message})
    }

    try {
        await categoryService.deleteCategory(id)
        res.json({message : "category deleted is successfully"})
    } catch (err) {
        res.json(400).json({error : err.message})
    }
}

const categoryController = {
    categories,
    byIdCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

module.exports = categoryController