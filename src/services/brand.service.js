const supabase = require("../supabase");

const addBrand = async (name, slug) => {
    const { data, error } = await supabase.from("brand").insert([{ name, slug }]).select()

    if (error)  return false

    return data
}

const removeBrand = async (id) => {
    const { data, error } = await supabase
        .from("brand")
        .delete()
        .eq("id", id)
        .select()

    if (error) return false
    
    return true
}

const putBrand = async (name, slug, id) => {
    const {data, error} = await supabase.from("brand").update({name, slug}).eq("id", id).select()

    if (error) return false

   return data
}

const patchBrand = async (obj,id) => {
    const {data, error} = await supabase.from("brand").update(obj).eq("id", id).select()

    if(error) false

    return data
}

module.exports = {
    addBrand,
    removeBrand,
    putBrand,
    patchBrand
}