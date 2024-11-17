const supabase = require("../supabase")

const addCategory = async (name, slug) => {
    const {data, error} = await supabase.from("category").insert([{name, slug}]).select()

    if(error) return false

    return data
}

const removeCategory = async (id) => {
    const {data, error} = await supabase.from("category").delete().eq("id", id).select()

    if(error) return false

    return true
}

const editCategory = async (name, slug, id) => {
    const {data, error} = await supabase.from("category").update({name, slug}).eq("id", id).select()

    if(error) return false

    return data
}

const addSubCategory = async (name, slug, category_id) => {
    const {data, error} = await supabase.from("sub_category").insert([{name, slug, category_id}]).select()

    if(error) return false

    return data
}

const removeSubCategory = async (id) => {
    const {data, error} = await supabase.from("sub_category").delete().eq("id", id).select()

    if(error) return false

    return true
}

const editSubCategory = async (obj, id) => {
    const {data, error} = await supabase.from("sub_category").update(obj).eq("id", id).select()

    if(error) return false

    return data
}

module.exports = {
    addCategory,
    removeCategory,
    editCategory,
    addSubCategory,
    removeSubCategory,
    editSubCategory
}