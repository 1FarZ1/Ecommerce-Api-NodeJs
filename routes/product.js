const router = require("express").Router();


const { createProduct, uploadImage, updateProduct,deleteProduct,getSingleProduct,getAllProducts } = require("../controllers/Product");
const { authorizeRoles, authMiddleware } = require("../middlewares/auth");

// const { getSingleProductReviews } = require('../controllers/reviewController');

router
  .route('/')
  .post([authMiddleware, authorizeRoles('admin')], createProduct)
  .get(getAllProducts);

router
  .route('/uploadImage')
  .post([authMiddleware, authMiddleware('admin')], uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authMiddleware, authMiddleware('admin')], updateProduct)
  .delete([authMiddleware, authMiddleware('admin')], deleteProduct);

// router.route('/:id/reviews').get(getSingleProductReviews);

module.exports = router;