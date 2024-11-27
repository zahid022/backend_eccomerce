const supabase = require("../supabase")

const allSubCategory = async () => {
    const { data, error } = await supabase.from("sub_category").select("*")

    if (error) throw new Error(error.message);

    return data
}

const byIdSubCategory = async (id) => {
    const { data, error } = await supabase.from("sub_category").select("*").eq("id", id).single()

    if (error) throw new Error("Sub-category not found");
    
    return data
}

const createSubCategory = async (params) => {
    const { data, error } = await supabase.from("sub_category").insert([params]).select()

    if (error) throw new Error(error.message);

    return data
}

const updateSubCategory = async (obj, id) => {
    const { data, error } = await supabase.from("sub_category").update(obj).eq("id", id).select()

    if (error) throw new Error(error.message);

    return data
}

const deleteSubCategory = async (id) => {
    const { error } = await supabase.from("sub_category").delete().eq("id", id).select()

    if (error) throw new Error(error.message);

    return true
}

const subCategoryService = {
    allSubCategory,
    byIdSubCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory
}

module.exports = subCategoryService