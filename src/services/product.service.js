const supabase = require("../supabase")

const addProduct = async ({ name, price, dis : discount, description, category_id, sub_category_id, img, brand_id }) => {
    
    const {data, error} = await supabase.from("products").insert([{ name, price, discount, description, category_id, sub_category_id, img, brand_id }]).select()

    if(error) return false

    return data
}

const editProduct = async (body, id) => {
    const newProduct = {};

    for (const [key, value] of Object.entries(body)) {
        if (value !== undefined && value !== null && value.toString().trim() !== '') {
            newProduct[key] = value;
        }
    }

    if(Object.keys(newProduct).length === 0) return false

    const {data, error} = await supabase.from("products").update(newProduct).eq("id", id).select()

    if(error) return false

    return data
};

const removeProduct = async (id) => {
    const {error} = await supabase.from("products").delete().eq("id", id).select()

    if(error) return false

    return true
}

module.exports = {
    addProduct,
    editProduct,
    removeProduct
}