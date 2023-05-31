const Product = require('../models/product');

const path = require('path');


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
    if (!req.files) {
        return res.status(400).json({
            success:false,
            message:"no file sent"
        })
      }
      const productImage = req.files.image;
    
      if (!productImage.mimetype.startsWith('image')) {
        return res.status(400).json({
            success:false,
            message:"upload an image please"
        })
      }
    
      const maxSize = 1024 * 1024;
    
      if (productImage.size > maxSize) {
        return res.status(400).json({
            success:false,
            message:"upload an image smaller then 1 mb"
        })
      }
    
      const imagePath = path.join(
        __dirname,
        '../views/uploads/' + `${productImage.name}`
      );
      await productImage.mv(imagePath);
      res.status(201).json({ image: `/uploads/${productImage.name}` }); 
}


let getSingleProduct = async (req,res)=>{
    try{
        const product = await Product.findById(req.params.id).populate('reviews');
        if(!product){
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }
        return res.status(201).json({
            success: true,
            product,
        });

    }
    catch(error){
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}


let updateProduct = async (req,res)=>{
    const {id} = req.params;
    try {
        let product = Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
            });
        if(!product){
            return res.status(404).json({
                success: false,
                error: 'Product not found',
            });
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

let deleteProduct = async (req,res)=>{
    const { id } = req.params;

  try {
    const product = await Product.findById(id);
  
    if (!product) {
      throw new CustomError.NotFoundError(`No product with id : ${id}`);
    }
  
    await product.remove();
    res.status(200).json({ msg: 'Success! Product removed.' });
  } catch (error) {
    return res.status(400).json({
        success:false,
        error:error.message
    })
  }
}

module.exports = {
    createProduct,
    getAllProducts,
    uploadImage,
    getSingleProduct,
    updateProduct,
    deleteProduct
}
