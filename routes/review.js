const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/auth');

const {
  createReview,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require('../controllers/review');

router.route('/').post(authMiddleware, createReview).get(getAllReviews);

router
  .route('/:id')
  .get(getSingleReview)
  .patch(authMiddleware, updateReview)
  .delete(authMiddleware, deleteReview);

module.exports = router;