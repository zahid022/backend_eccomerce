const supabase = require("../supabase");
const brandService = require("./brand.service");
const categoryService = require("./category.service");
const subCategoryService = require("./sub_category.service");

const allProduct = async () => {
    const { data, error } = await supabase.from("products").select("*")

    if (error) throw new Error(error.message);

    return data
}

const byIdProduct = async (id) => {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) throw new Error("Product not found");

    return data
}

const createProduct = async (params) => {
    const { name: brand } = await brandService.byIdBrand(params.brand_id)
    params.brand_name = brand

    const { name: category } = await categoryService.byIdCategory(params.category_id)
    params.category_name = category

    const { name: sub_category } = await subCategoryService.byIdSubCategory(params.sub_category_id)
    params.sub_category_name = sub_category

    const { data, error } = await supabase.from("products").insert([params]).select()

    if (error) throw new Error(error.message);

    return data
}

const byCategoryIdProduct = async (id) => {

    await categoryService.byIdCategory(id)

    const { data, error } = await supabase.from("products").select("*").eq("category_id", id)

    if (error) throw new Error(error.message);
    
    return data
}

const byBrandIdProduct = async (id) => {

    await brandService.byIdBrand(id)

    const { data, error } = await supabase.from("products").select("*").eq("brand_id", id)

    if (error) throw new Error(error.message);
    
    return data
}

const bySubCategoryIdProduct = async (id) => {

    await subCategoryService.byIdSubCategory(id)

    const { data, error } = await supabase.from("products").select("*").eq("sub_category_id", id)

    if (error) throw new Error(error.message);
    
    return data
}

const updateProduct = async (body, id) => {

    await byIdProduct(id)

    const newProduct = {};

    for (const [key, value] of Object.entries(body)) {
        if (value !== undefined && value !== null && value.toString().trim() !== '') {
            newProduct[key] = value;
        }
    }

    if(Object.keys(newProduct).length === 0) throw new Error("Field is missing");

    const {data, error} = await supabase.from("products").update(newProduct).eq("id", id).select()

    if(error) throw new Error(error.message);

    return data
};

const deleteProduct = async (id) => {
    await byIdProduct(id)

    const {error} = await supabase.from("products").delete().eq("id", id).select()

    if(error) throw new Error(error.message);

    return true
}

const productService = {
    allProduct,
    byIdProduct,
    createProduct,
    byCategoryIdProduct,
    byBrandIdProduct,
    bySubCategoryIdProduct,
    updateProduct,
    deleteProduct
}

module.exports = productService