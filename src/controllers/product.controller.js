const productService = require("../services/product.service")

const allProduct = async (req, res) => {
    try {
        const { page = 1, limit = 10, color, size, brand, category, subCategory, minPrice, maxPrice, discount, tag } = req.query;
        const colors = color ? color.split("%") : [];
        const sizes = size ? size.split("%") : [];
        const tags = tag ? tag.split("%") : [];
        const data = await productService.allProduct({ page, limit, color: colors, size : sizes, brand, category, subCategory, minPrice, maxPrice, discount, tags });

        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


const byIdProduct = async (req, res) => {
    const { id } = req.params

    try {
        let data = await productService.byIdProduct(id)
        res.json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const createProduct = async (req, res) => {
    const { body } = req

    try {
        let data = await productService.createProduct(body)
        res.json({
            message: "Product is successfully created",
            data
        })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const byCategoryIdProduct = async (req, res) => {
    const { categoryId } = req.params

    try {
        let data = await productService.byCategoryIdProduct(categoryId)
        res.json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const byBrandIdProduct = async (req, res) => {
    const { brandId } = req.params

    try {
        let data = await productService.byBrandIdProduct(brandId)
        res.json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const bySubCategoryIdProduct = async (req, res) => {
    const { subCategoryId } = req.params

    try {
        let data = await productService.bySubCategoryIdProduct(subCategoryId)
        res.json(data)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const updateProduct = async (req, res) => {
    const { id } = req.params

    try {
        let data = await productService.updateProduct(req.body, id)

        res.json({
            message: "Product is updated successfully",
            data
        })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const deleteProduct = async (req, res) => {
    const { id } = req.params
    try {
        await productService.deleteProduct(id)
        res.json({ message: "Product is deleted successfully" })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

const productController = {
    allProduct,
    byIdProduct,
    createProduct,
    byCategoryIdProduct,
    byBrandIdProduct,
    bySubCategoryIdProduct,
    updateProduct,
    deleteProduct
}

module.exports = productController