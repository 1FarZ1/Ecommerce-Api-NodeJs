const Product = require('../models/product');

let createProduct = async (req,res)=>{
    const { name, price, description, category, company, colors, featured, freeShipping, inventory } = req.body;

    let ProductToCreate = {
        name,
        price,
        description,
        category,
        company,
        colors,
        featured,
        freeShipping,
        inventory,
        user: req.user.userId,
    }
    try {
        const product = await Product.create(ProductToCreate);
        return res.status(201).json({
            success: true,
            product,
        });
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}


let getAllProducts = async (req,res)=>{
    try{
        const products = await Product.find({});
        return res.status(201).json({
            success:true,
            products,
            count: products.length,
        });

    }
    catch(error){
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

let uploadImage = async (req,res)=>{
}


let getSingleProduct = async (req,res)=>{
}


let updateProduct = async (req,res)=>{
}

let deleteProduct = async (req,res)=>{

}

module.exports = {
    createProduct,
    getAllProducts,
    uploadImage,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
