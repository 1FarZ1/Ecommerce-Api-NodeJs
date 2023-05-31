
const Order = require('../models/order');
const Product = require('../models/product');
const checkPermissions = require('../utils/checkPermissions');
const fakeStripeAPI = require('../utils/fakeStripeApi');

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
            error: `Order with id ${id} not found`,
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



  
// need to revise this
const createOrder = async (req, res) => {
    const { items: cartItems, tax, shippingFee } = req.body;
  
    if (!cartItems || cartItems.length < 1) {
        return res.status(400).json({ msg: 'No items in cart' });
    }
    if (!tax || !shippingFee) {
        return res.status(400).json({ msg: 'Please provide tax and shipping fee' });
    }
  
    let orderItems = [];
    let subtotal = 0;
  
    for (const item of cartItems) {
      const dbProduct = await Product.findbyId(item.product);
      if (!dbProduct) {
        return res.status(400).json({ msg: `No product with id : ${item.product}` });
      }
      const { name, price, image, _id } = dbProduct;
      const singleOrderItem = {
        amount: item.amount,
        name,
        price,
        image,
        product: _id,
      };
      orderItems = [...orderItems, singleOrderItem];
      // calculate subtotal

      // price of the items
      subtotal += item.amount * price;
    }

    // totol price including tax and shipping fee
    const total = tax + shippingFee + subtotal;


    // create the payment intent
    const paymentIntent = await fakeStripeAPI({
      amount: total,
      currency: 'usd',
    });
  

    // creating the order 
    const order = await Order.create({
      orderItems,
      total,
      subtotal,
      tax,
      shippingFee,
      clientSecret: paymentIntent.client_secret,
      user: req.user.userId,
    });
  
    res
      .status(200)
      .json({ order, clientSecret: order.clientSecret });
  };

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