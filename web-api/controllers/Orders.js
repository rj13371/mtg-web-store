const Order = require("../models/Orders");
const User = require("../models/Users");
const Product = require("../models/Products");
const MtgCard = require("../models/MtgCard");
const sendEmail = require('../utils/Nodemailer')
const moment = require('moment')

// creating a new order
module.exports.createOrder = async (req, res) => {
  const user = await User.findById(req.body.userId);
  let quantityCheck = false;

  const newOrder = new Order();

  for (const order of req.body.productArray) {
    if (order.mtgo_id) {
      const product = await MtgCard.findById(order._id);

      if (order.quantity > product.stock) {
        return res.send(
          `${order._id} failed! quantity is greater then stock!!`
        );
      }
    } else {
      const product = await Product.findById(order._id);
      if (order.quantity > product.stock) {
        return res.send(
          `${order._id} failed! quantity is greater then stock!!`
        );
      }
    }

    quantityCheck = true;
  }

  if (quantityCheck) {
    for (const order of req.body.productArray) {
      if (order.mtgo_id) {
        const product = await MtgCard.findById(order._id);
        newOrder.products.push(order);
        product.stock -= order.quantity;
        await product.save();
      } else {
        const product = await Product.findById(order._id);

        newOrder.products.push(order);
        product.stock -= order.quantity;
        await product.save();
      }
    }

    newOrder.customer = req.body.userId;
    newOrder.total = req.body.total
    user.orders.push(newOrder);

    await user.save();
    await newOrder.save();

    // sends email to employee with details of order waiting for approval

    sendEmail('orderCreatedEmployee',user.email,`${user.email} has placed an order!`,newOrder,null);

      // sends email to customer with details of order
    sendEmail('orderCreatedCustomer',user.email,`Your order has been placed at Bastion Games, ${user.username}! `,newOrder,null);

    res.send(`Successful Orders: ${newOrder} `);
  }
};

// editting an existing order
module.exports.editOrder = async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const orderId = req.body.orderId;
  const productArray = req.body.productArray;
  res.send(
    `User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray}`
  );
};

// showing any pending orders
module.exports.showOrders = async (req, res) => {

  console.log(req.body.paramType)
  console.log(req.body.query)

  if (req.body.paramType) {

    if (req.body.paramType === 'userName') {
      const user = await User.findOne({username: req.body.query}).populate('orders')
      res.send(user.orders)
      }
    else if (req.body.paramType === 'date'){
      const orders = await Order.find({updatedAt: req.body.query})
      res.send(orders)
      }
      else if (req.body.paramType === 'cost'){
        const orders = await Order.find({ 'products.total': req.body.query })
        res.send(orders)
        }
        else if (req.body.paramType === 'productName'){
         const orders = await Order.find({ 'products.productName': req.body.query })
          res.send(orders)
          }
          else if (req.body.paramType === 'cardName'){
            const orders = await Order.find({ 'products.name': req.body.query })
            res.send(orders)
                    }
                    else if (req.body.paramType === 'orderId'){
                      const orders = await Order.findById(req.body.query)
                      res.send([orders])
                              }

}else {

  const user = await User.findById(req.body.userId).populate('orders')

  res.send(user.orders)
}
  

  
};

// deleting a pending order
module.exports.deleteOrder = async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const orderId = req.body.orderId;
  res.send(`User: ${userId} \n OrderId: ${orderId}`);
};

// checking out an order for payment
module.exports.checkout = async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const orderId = req.body.orderId;
  const productArray = req.body.productArray;

  const user = await User.findById(userId).populate('orders')

  sendEmail('orderCreated',null,`${user.email} has placed an order! Order id#${orderId}`,user,null);

  res.send(
    `User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray}`
  );
};

// approve an order (Employee authorization required)
module.exports.approveOrder = async (req, res) => {

  if(req.body.authorizationLevel !== '1') {
    return res.send('error, not authorized')
}

  const order = await Order.findById(req.body.orderId).populate('customer')

  if(order.isApproved == true) {
    return res.status(500).json({ message: 'error, is already approved!' })
  }else {

  order.isApproved = true;
  order.updatedAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a")

  await order.save()

  console.log(order)

  const user = await User.findById(order.customer).populate('orders')


  sendEmail('orderApproval',user.email,`Your order has been approved! , ${user.username}! `,order,null);


  res.send(order)}
};
