const supabase = require("../supabase");
const productService = require("./product.service");

const cartGet = async (id) => {
    const { data, error } = await supabase.from("cart").select("*").eq("user_id", id)

    if (error) throw new Error(error.message);

    return data
}

const cartAdd = async (id, product_id, count) => {
    await productService.byIdProduct(product_id)

    const { data: existingItem, error: fetchingError } = await supabase
        .from("cart")
        .select("*")
        .eq("user_id", id)
        .eq("product_id", product_id)
        .single();

    if (existingItem) {
        const { data, error } = await supabase.from("cart").update([{ count: +existingItem.count + +count }]).eq("user_id", id).eq("product_id", product_id).select()
        if (error) throw new Error(error.message);

        return data
    } else {
        const { data, error } = await supabase.from("cart").insert([{ "user_id": id, product_id: product_id, count: count }]).select()
        if (error) throw new Error(error.message);

        return data;
    }
}

const cartDelete = async (id, user_id) => {

    let data = await cartGet(user_id)  

    let result = data.find(item => +item.id === +id)

    if(!result) throw new Error("Product not found");
    
    const {error} = await supabase.from("cart").delete().eq("id", id)

    if(error) throw new Error(error.message);

    return true
}

const cartService = {
    cartGet,
    cartAdd,
    cartDelete
}

module.exports = cartService