const supabase = require("../supabase")

const allComment = async (id) => {
    const { data, error } = await supabase.from("comments").select("*").eq("product_id", id)

    if (error) return false

    return data
}

const addComment = async (product_id, user_id, content) => {
    const { data, error } = await supabase.from("comments").insert([{ product_id, user_id, content }]).select()
    
    if (error) return false

    return data
}

const removeComment = async (id, user_id) => {
    const { data, error } = await supabase.from("comments").delete().eq("id", id).eq("user_id", user_id)

    if(error) return false

    return true
}

module.exports = {
    allComment,
    addComment,
    removeComment
}