const Review = require("../models/review");
const Product = require("../models/product");
const checkPermissions = require("../utils/checkPermissions");


let createReview = async (req,res)=>{
    const { rating, title, comment, product } = req.body;
    try {

        let productExist = Product.findById(product);
        if(!productExist){
            return res.status(404).json({
                success: false,
                error: `Product with id ${product} not found`,
            });
        }
        let alreadyReviewed = await Review.findOne({user:req.user.userId,product});
        if(alreadyReviewed){
            return res.status(400).json({ msg: 'already reviewed' });
        }


        if (!rating || !title || !comment || !product) {
            return res.status(400).json({ msg: 'fill all the credentials' })
        }


        let reviewData = {
            rating,
            title,
            comment,
            product,
            user: req.user.userId,
        }
        const review = await Review.create(reviewData);
        return res.status(201).json({
            success: true,
            review,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }

}

let updateReview = async (req,res)=>{
    try {
        const { id } = req.params;
    const { rating, title, comment } = req.body;
    const review = await  Review.findById(id);
    if(!review){
        return res.status(404).json({
            success: false,
            error: `Review with id ${id} not found`,
        });
    }
    checkPermissions(req.user,review.user);
    review.rating = rating;
    review.title = title;
    review.comment = comment;
    await review.save();
    res.status(200).json({ msg: 'Success! Review updated', review });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }


}

const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;
  
    const review = await Review.findById(id);
  
    if (!review) {
        return res.status(404).json({
            success: false,
            error: 'Review not found',
        });
        }
    checkPermissions(req.user, review.user);
    await review.remove();
    res.status(200).json({ msg: 'Success! Review removed' });
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
    }
  };
  



let getAllReviews = async (req,res)=>{
    try {
      const reviews = await Review.find({}).populate({
        path: 'product',
        select: 'name company price',
      });
     return  res.status(200).json({ reviews, count: reviews.length });
    
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

let getSingleReview = async (req,res)=>{
    try {
        const { id } = req.params;
        const review = await Review.findById(id);
        if(!review){
            return res.status(404).json({
                success: false,
                error: `Review with id ${id} not found`,
            });
        }
        return res.status(200).json({
            success: true,
            review,
        });
       } catch (error) {
        return res.status(400).json({
            success: false,
            error: error.message,
        });
       }
}

const getSingleProductReviews = async (req, res) => {
    const { id } = req.params;
    const reviews = await Review.find({ product: id });
    res.status(200).json({ reviews, count: reviews.length });
  };

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getAllReviews,
    getSingleReview,
    getSingleProductReviews
}
