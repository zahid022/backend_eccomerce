const supabase = require("../supabase")

const getTile = async () => {
    const { data, error } = await supabase.from("banners").select("*")

    if (error) return error.message

    return data
}

const createTile = async (params) => {
    const { data, error } = await supabase.from("banners").insert([params]).select();

    if (error) return error.message

    return data
}

const deleteTile = async (id) => {
    const { error } = await supabase
        .from("banners")
        .delete()
        .eq("id", id)
        .select()

    if (error) throw new Error("Brand deleted failed");

    return true
}

const bannerService = {
    getTile,
    createTile,
    deleteTile
}

module.exports = bannerService