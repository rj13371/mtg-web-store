const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product')
const { checkout } = require('../routes/Users');

// creating a new order
module.exports.createOrder = async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const productArray = req.body.productArray
    res.send(`User: ${userId} \n Products: ${productArray}`)
}

// editting an existing order
module.exports.editOrder = async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const orderId = req.body.orderId
    const productArray = req.body.productArray
    res.send(`User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray}`)
}

// showing any pending orders
module.exports.showOrder = async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const orderId = req.body.orderId
    const productArray = req.body.productArray
    res.send(`User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray}`)
}

// deleting a pending order
module.exports.deleteOrder = async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const orderId = req.body.orderId
    res.send(`User: ${userId} \n OrderId: ${orderId}`)
}

// checking out an order for payment
module.exports.checkout = async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const orderId = req.body.orderId
    const productArray = req.body.productArray
    res.send(`User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray}`)
}

// approve an order (Employee authorization required)
module.exports.approveOrder = async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const orderId = req.body.orderId
    const productArray = req.body.productArray
    const employeeId = req.body.employeeId
    res.send(`User: ${userId} \n OrderId: ${orderId} \n Products: ${productArray} \n EmployeeId: ${employeeId}`)    
}