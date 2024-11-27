const supabase = require("../supabase")

const categories = async () => {
    const { data, error } = await supabase.from("category").select("*")

    if (error) throw new Error(error.message);

    return data
}

const byIdCategory = async (id) => {
    const { data, error } = await supabase.from("category").select("*").eq("id", id).single()

    if (error) throw new Error("Category not found");
    
    return data
}

const createCategory = async (params) => {
    const { data, error } = await supabase.from("category").insert([params]).select()

    if (error) throw new Error(`Category failed to create ${error.message}`);
    
    return data
}

const updateCategory = async (params, id) => {
    const { data, error } = await supabase.from("category").update(params).eq("id", id).select()

    if (error) throw new Error(error.message);

    return data
}

const deleteCategory = async (id) => {
    const { error } = await supabase.from("category").delete().eq("id", id).select()

    if (error) throw new Error(error.message);

    return true
}

const categoryService = {
    categories,
    byIdCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

module.exports = categoryService