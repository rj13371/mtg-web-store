const Order = require("../models/Orders");
const User = require("../models/Users");
const Product = require("../models/Products");
const MtgCard = require("../models/MtgCard");
const { checkout } = require("../routes/Users");

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
    user.orders.push(newOrder);

    await user.save();
    await newOrder.save();

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
module.exports.showOrder = async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const orderId = req.body.orderId;
  const productArray = req.body.productArray;
  res.send(
    `User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray}`
  );
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
  res.send(
    `User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray}`
  );
};

// approve an order (Employee authorization required)
module.exports.approveOrder = async (req, res) => {
  console.log(req.body);
  const userId = req.body.userId;
  const orderId = req.body.orderId;
  const productArray = req.body.productArray;
  const employeeId = req.body.employeeId;
  res.send(
    `User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray} \n EmployeeId: ${employeeId}`
  );
};
