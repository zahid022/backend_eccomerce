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

    if (error) throw new Error("Tile banner deleted failed");

    return true
}


const getTrend = async () => {
    const { data, error } = await supabase.from("trend").select("*")

    if(error) return error.message

    return data
}

const createTrend = async (params) => {
    const {data, error} = await supabase.from("trend").insert([params]).select()

    if(error) return error.message

    return data
}

const deleteTrend = async (id) => {
    const {data, error} = await supabase.from("trend").delete().eq("id", id).select()

    if (error) throw new Error("Trend banner deleted failed");

    return true
}

const bannerService = {
    getTile,
    createTile,
    deleteTile,
    getTrend,
    createTrend,
    deleteTrend
}

module.exports = bannerService