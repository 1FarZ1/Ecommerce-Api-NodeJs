
const Order = require('../models/order');
const Product = require('../models/product');
const checkPermissions = require('../utils/checkPermissions');

const getAllOrders = async (req, res) => {
      try {
        const orders = await Order.find({});
        res.status(200).json({ orders, count: orders.length });
      } catch (error) {
        res.status(400).json({ error: error.message });
        
      }
      };

let getSingleOrder = async (req, res) => {
   try {
    const { id } = req.params;
    const order= await Order.findById(id);
    if(!order){
        return res.status(404).json({
            success: false,
            error: 'Order with id ${id} not found',
        });
    }
    checkPermissions(req.user,order.user);
    return res.status(200).json({
        success: true,
        order,
    });
   } catch (error) {
    return res.status(400).json({
        success: false,
        error: error.message,
    });
   }
}

let getCurrentUserOrders = async (req, res) => {
    const orders= await Order.find({user:req.user._id});
    if(!orders){
        return res.status(404).json({
            success: false,
            error: 'Orders with this user not found',
        });}
    return res.status(200).json({orders,count:orders.length});
}

let createOrder = async (req, res) => {
}

let updateOrder = async (req, res) => {

    const { id } = req.params;
    const { paymentIntentId } = req.body;
  
    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).send(`No order with id : ${id}`);
    }
    checkPermissions(req.user, order.user);  
    order.paymentIntentId = paymentIntentId;
    order.status = 'paid';
    await order.save();
  
   return  res.status(200).json({ order });
}







module.exports = {
  getAllOrders,
  getSingleOrder,
  getCurrentUserOrders,
  createOrder,
  updateOrder,
} 