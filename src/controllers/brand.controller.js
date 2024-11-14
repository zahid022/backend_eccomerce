const { addBrand, removeBrand, putBrand, patchBrand } = require("../services/brand.service");
const supabase = require("../supabase");

const allBrand = async (req, res) => {
    const { data, error } = await supabase.from("brand").select("*")

    if (error) return res.status(500).json({ error: error.message });

    res.json(data)
}

const byIdBrand = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase.from("brand").select("*").eq("id", id).single()

    if (error) return res.status(404).json({ error: "brand not found" })

    res.json(data)
}

const createBrand = async (req, res) => {

    const { name, slug } = req.body

    if (!name || !slug) return res.status(400).json({ error: "name and slug are required" })

    let newData = await addBrand(name, slug)

    if (!newData) res.status(500).json({ error: "Server error" });

    res.json(newData);
}

const deleteBrand = async (req, res) => {
    const { id } = req.params

    const { data, error } = await supabase
        .from("brand").select("*")

    if (error) return res.status(500).json({ error: error.message });

    let brand = data.find(item => item.id === +id)

    if (!brand) return res.status(404).json({ error: "brand is not found" })

    let txt = removeBrand(id)

    if (!txt) return res.status(500).json({ error: "Server error" });

    res.status(200).json({ message: txt && "brand deleted is successfully" });
}

const replaceBrand = async (req, res) => {
    const { id } = req.params
    const { name, slug } = req.body

    if (!name || !slug) return res.status(400).json({ error: "name and slug are required" })

    const { data, error } = await supabase.from("brand").select("*")

    if (error) return res.status(500).json({ error: error.message });

    const brand = data.find(item => +item.id === +id)

    if (!brand) return res.status(404).json({ message: "brand is not found" })

    const newBrand = await putBrand(name, slug, id)

    if (!newBrand) return res.status(500).json({ error: "server error" })

    res.json(newBrand)
}

const updateBrand = async (req, res) => {
    const { id } = req.params

    const { name, slug } = req.body

    let updateFields = {}

    if (name) updateFields.name = name
    if (slug) updateFields.slug = slug

    if (Object.keys(updateFields).length === 0) return res.status(400).json({ error: "No fields to update" })

    const { data, error } = await supabase.from("brand").select("*")

    if (error) res.status(500).json({ error: error.message })

    const brand = data.find(item => +item.id === +id)

    if (!brand) res.status(404).json({ message: "brand is not found" })

    const newBrand = await patchBrand(body, id, res)

    if (!newBrand) return res.status(500).json({ error: "server error" })

    res.json({ message: "brand updated is successfully", newBrand })
}

module.exports = {
    allBrand,
    createBrand,
    deleteBrand,
    replaceBrand,
    updateBrand,
    byIdBrand
}