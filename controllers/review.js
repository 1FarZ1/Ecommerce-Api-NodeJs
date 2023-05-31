const Review = require("../models/review");
const checkPermissions = require("../utils/checkPermissions");


let createReview = async (req,res)=>{
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

module.exports = {
    createReview,
    updateReview,
    deleteReview,
    getAllReviews,
    getSingleReview
}
