const { addCategory, removeCategory, editCategory, addSubCategory, removeSubCategory, editSubCategory } = require("../services/category.service")
const supabase = require("../supabase")

const allCategory = async (req, res) => {
    const {data, error} = await supabase.from("category").select("*")

    if(error) return res.status(500).json({error : error.message})

    res.json(data)
}

const byIdCategory = async (req, res) => {
    const { id } = req.params

    const {data, error} = await supabase.from("category").select("*").eq("id", id).single()

    if(error) return res.status(404).json({error : "category not found"})

    res.json(data)
}

const createCategory = async (req, res) => {
    const {name, slug} = req.body

    if(!name || !slug) return res.status(400).json({error : "name and slug are required"})

    const newCategory = await addCategory(name, slug)

    if(!newCategory) return res.status(500).json({error : "Server error"})

    res.json(newCategory)
}

const deleteCategory = async (req, res) => {
    const { id } = req.params

    const {data, error} = await supabase.from("category").select("*")

    if(error) return res.status(500).json({error : error.message})
    
    let category = data.find(item => +item.id === +id)

    if(!category) return res.status(400).json({error : "category not found"})

    let txt = removeCategory(id)

    if(!txt) return res.status(500).json({error : "Server error"})

    res.json({message : "category deleted is successfully"})


}

const updateCategory = async (req, res) => {
    const { id } = req.params

    const {name, slug} = req.body

    if(!name || !slug) return res.status(400).json({error : "name and slug are required"})

    const { data, error } = await supabase.from("category").select("*")

    if(error) return res.status(500).json({error : error.message})

    let category = data.find(item => +item.id === +id)

    if(!category) return res.status(400).json({error : "category not found"})

    let newData = await editCategory(name, slug, id)

    if(!newData) return res.status(500).json({error : "server error"})

    res.json(newData)
    
}

const allSubCategory = async (req, res) => {
    const {data, error} = await supabase.from("sub-category").select("*")

    if(error) return res.status(500).json({error : error.message})

    res.json(data)
}

const byIdSubCategory = async (req, res) => {
    const { id } = req.params

    const {data, error} = await supabase.from("sub-category").select("*").eq("id", id).single()

    if(error) return res.status(404).json({error : "sub-category bot found"})

    res.json(data)

}

const createSubCategory = async (req, res) => {
    const {name, slug, category_id} = req.body

    if(!name || !slug || !category_id) return res.status(400).json({error : "name, slug and category_id are required"})

    let newData = await addSubCategory(name, slug, category_id)

    if(!newData) return res.status(500).json({error : "server error"})

    res.json({message: "sub-category created successfully", newData})
}

const deleteSubCategory = async (req, res) => {
    const { id } = req.params

    const {data, error} = await supabase.from("sub-category").select("*")

    if(error) return res.status(500).json({error : error.message})

    const subcategory = data.find(item => +item.id === +id)

    if(!subcategory) return res.status(404).json({error : "sub-category not found"})

    let txt = await removeSubCategory(id)

    if(!txt) return res.status(500).json({error : "server error"})
    
    res.json({message : "sub-category deleted successfully"})
}

const updateSubCategory = async (req, res) => {
    const { id } = req.params
    const { name, slug, category_id } = req.body

    const {data, error} = await supabase.from("sub-category").select("*")

    if(error) return res.status(500).json({error : error.message})

    const subcategory = data.find(item => +item.id === +id) 

    if(!subcategory) return res.status(404).json({error : "sub-category not found"})

    let obj = {}

    if(name) obj.name = name
    if(slug) obj.slug = slug
    if(category_id) obj.category_id = category_id

    if(Object.keys(obj).length === 0) return res.status(400).json({error : "field is empty"})

    let newData = await editSubCategory(obj, id)

    if(!newData) return res.status(500).json({error : "server error"})

    res.json(newData)
}

module.exports = {
    allCategory,
    byIdCategory,
    createCategory,
    deleteCategory,
    updateCategory,
    allSubCategory,
    byIdSubCategory,
    createSubCategory,
    deleteSubCategory,
    updateSubCategory
}