const router = require("express").Router();

const {createProduct,getAllProducts,uploadImage,getSingleProduct,updateProduct,deleteProduct} = require("../controllers/product");
const { authorizeRoles, authMiddleware } = require("../middlewares/auth");

// const { getSingleProductReviews } = require('../controllers/reviewController');

router
  .route('/')
  .get(getAllProducts)
  .post([authMiddleware, authorizeRoles('admin')], createProduct)
  
  router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authMiddleware, authMiddleware('admin')], updateProduct)
  .delete([authMiddleware, authMiddleware('admin')], deleteProduct);
  
  router
    .route('/uploadImage')
    .post([authMiddleware, authMiddleware('admin')],uploadImage);
  // router.route('/:id/reviews').get(getSingleProductReviews);

module.exports = router;