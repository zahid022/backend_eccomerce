const supabase = require("../supabase")

const cartAll = async (user) => {
    const { data, error } = await supabase.from("cart").select("*").eq("user_id", user.user.id)

    if (error) return false

    return data
}

const cartCreate = async (user, productId, quantity) => {
    const { data: existingItem, error: fetchingError } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", user.user.id)
        .eq("product_id", productId)
        .single();

    if (existingItem) {
        const { data, error } = await supabase.from("cart").update([{ count: +existingItem.count + +quantity }]).eq("user_id", user.user.id).eq("product_id", productId).select()
        if (error) return false

        return data
    } else {
        const { data, error } = await supabase.from("cart").insert([{ "user_id": user.user.id, product_id: productId, count: quantity }]).select()
        if (error) return false

        return data;
    }
}

const cartRemove = async (id) => {
    const {error} = await supabase.from("cart").delete().eq("id", id)

    if(error) return false

    return true
}

module.exports = {
    cartAll,
    cartCreate,
    cartRemove
}