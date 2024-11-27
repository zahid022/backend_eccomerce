const supabase = require("../supabase")
const productService = require("./product.service")

const getComment = async (id) => {

    await productService.byIdProduct(id)

    const { data, error } = await supabase.from("comments").select("*").eq("product_id", id)

    if (error) throw new Error(error.message);

    return data
}

const createComment = async (product_id, user_id, content) => {

    await productService.byIdProduct(product_id)

    const { data, error } = await supabase.from("comments").insert([{ product_id, user_id, content }]).select()

    if (error) throw new Error(error.message);

    return data
}

const deleteComment = async (id, user_id) => {
    const { error : errorNot } = await supabase.from("comments").select("*").eq("id", id).single()
    
    if (errorNot) throw new Error("Comment not found");

    const { error } = await supabase.from("comments").delete().eq("id", id).eq("user_id", user_id)

    if (error) throw new Error(error.message);

    return true
}

const commentService = {
    getComment,
    createComment,
    deleteComment
}

module.exports = commentService