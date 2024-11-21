const { getCategories } = require("../services/category.service")
const { addProduct, editProduct, removeProduct, productByCategory } = require("../services/product.service")
const supabase = require("../supabase")

const allProduct = async (req, res) => {
    const { data, error } = await supabase.from("products").select("*")

    if (error) return res.status(500).json({ error: error.message })

    res.json(data)
}

const byIdProduct = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) return res.status(404).json({ error: "product not found" })

    res.json(data)
}

const createProduct = async (req, res) => {

    const requiredFields = [
        'name',
        'price',
        'description',
        'category_id',
        'sub_category_id',
        'stock',
        'img',
        'brand_id',
        'size',
        'color'
    ];

    for (let field of requiredFields) {
        if (!req.body[field] || !req.body[field].toString().trim()) {
            return res.status(400).json({ error: `${field} is missing` });
        }
    }

    const { name, price, discount, description, stock, category_id, sub_category_id, img, brand_id, size, color } = req.body

    if (discount && (+discount >= +price)) return res.status(400).json({ message: "the discount must be less than the price" })

    if (isNaN(price)) return res.status(400).send({ message: "price must be a number" })

    if (isNaN(stock)) return res.status(400).send({ message: "stock must be a number" })

    if (!size || size.length === 0 || !Array.isArray(size)) return res.status(400).json({ error: "size must be an array" })

    if (!color || color.length === 0 || !Array.isArray(size)) return res.status(400).json({ error: "color must be an array" })

    if (discount && isNaN(discount)) return res.status(400).send({ message: "discount must be a number" })

    let dis = 0

    if (discount) dis = discount

    let newData = await addProduct({ name, price, dis, description, stock, category_id, sub_category_id, img, brand_id, size, color })

    if (!newData) return res.status(500).json({ error: "server error" })

    res.json({ message: "product created successfully", newData })
}

const updateProduct = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase.from("products").select("*")

    if (error) return res.status(500).json({ error: error.message })

    const product = data.find(item => +item.id === +id)

    if (!product) return res.status(401).json({ error: "product not found" })

    for (const [key, value] of Object.entries(req.body)) {
        if (value.length === 0) return res.status(401).json({ error: `${key} is missed` })
    }

    if (req.body.discount && (+req.body.discount >= +product.price)) return res.status(401).json({ error: "the discount must be less than the price", "price": product.price })

    let newData = await editProduct(req.body, id)

    if (!newData) return res.status(500).json({ error: "server error" })

    res.json(newData)
}

const deleteProduct = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase.from("products").select("*")

    if (error) return res.status(500).json({ error: error.message })

    const product = data.find(item => +item.id === +id)

    if (!product) return res.status(401).json({ error: "product not found" })

    let txt = await removeProduct(id)

    if (!txt) return res.status(500).json({ error: "server error" })

    res.json({ message: "product deleted is successfully" })
}

const byCategoryIdProduct = async (req, res) => {
    const { categoryId } = req.params

    const categories = await getCategories()

    const bool = categories.find(item => +item.id === +categoryId)

    if (!bool) return res.status(400).json({ error: "id is invalid" })

    let result = await productByCategory(categoryId)

    if (!result) return res.status(500).json({ error: "server error" })

    res.json(result)
}


module.exports = {
    allProduct,
    byIdProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    byCategoryIdProduct
}