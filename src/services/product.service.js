const supabase = require("../supabase");
const brandService = require("./brand.service");
const categoryService = require("./category.service");
const subCategoryService = require("./sub_category.service");

const allProduct = async ({
    page,
    limit,
    color,
    size,
    brand,
    category,
    subCategory,
    minPrice,
    maxPrice,
    discount
}) => {
    const offset = (page - 1) * limit;

    let query = supabase
        .from("products")
        .select("*", { count: "exact" });


    if (color && color.length > 0) {
        const colorsArray = `{${color.join(",")}}`; 
        query = query.overlaps("color", colorsArray); 
    }

    if (size && size.length > 0) {
        const sizesArray = `{${size.join(",")}}`; 
        query = query.overlaps("size", sizesArray);
    }

    if (brand) query = query.eq("brand_id", brand);
    if (category) query = query.eq("category_id", category);
    if (subCategory) query = query.eq("sub_category_id", subCategory);

    if (minPrice) query = query.gte("price", parseFloat(minPrice));
    if (maxPrice) query = query.lte("price", parseFloat(maxPrice));

    if (discount !== undefined) query = query.eq("discount", discount === "true");

    query = query.range(offset, offset + parseInt(limit) - 1);

    const { data, error, count } = await query;

    return {
        page: parseInt(page),
        limit: parseInt(limit),
        total: count || 0,
        data : data || [],
    };
};



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