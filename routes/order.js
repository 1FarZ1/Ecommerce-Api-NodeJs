
const router =  require('express').Router();
const {
  authMiddleware,
  authorizeRoles,
} = require('../middlewares/auth');

const {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} = require('../controllers/order');

router
  .route('/')
  .post(authMiddleware, createOrder)
  .get(authMiddleware, authorizeRoles('admin'), getAllOrders);

router.route('/me').get(authMiddleware, getCurrentUserOrders);

router
  .route('/:id')
  .get(authMiddleware, getSingleOrder)
  .patch(authMiddleware, updateOrder);

module.exports = router;