const supabase = require("../supabase");

const allBrand = async () => {
    const {data, error} = await supabase.from("brand").select("*")

    if(error) return error.message

    return data
}

const byIdBrand = async (id) => {

    const { data, error } = await supabase.from("brand").select("*").eq("id", id).single()

    if (error) throw new Error("Brand not found");
     
    return data
}

const createBrand = async (params) => {
    const { data, error } = await supabase.from("brand").insert([params]).select();

    if (error) throw new Error(`Brand creation failed: ${error.message}`);
    
    return data;
};

const deleteBrand = async (id) => {
    const { error } = await supabase
        .from("brand")
        .delete()
        .eq("id", id)
        .select()

    if (error) throw new Error("Brand deleted failed");

    return true
}

const replaceBrand = async (params, id) => {
    const { data, error } = await supabase.from("brand").update(params).eq("id", id).select()

    if (error) return error.message

    return data
}

const brandService = {
    allBrand,
    byIdBrand,
    createBrand,
    deleteBrand,
    replaceBrand
}

module.exports = brandService