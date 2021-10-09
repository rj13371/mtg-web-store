const Order = require('../models/Orders');
const User = require('../models/Users');
const Product = require('../models/Products')
const { checkout } = require('../routes/Users');

// creating a new order
module.exports.createOrder = async (req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const productArray = req.body.productArray
    res.send(`User: ${userId} productArray: ${productArray}`)
}


// router.post('/approveOrder', catchAsync(Orders.approveOrder)) // approve an order (Employees Authorization)

// router.post('/createOrder', catchAsync(Orders.createOrder)) // create new order

// router.put('/editOrder', catchAsync(Orders.editOrder)) // edit order

// router.get('/listUpOrders', catchAsync(Orders.listUpOrders)) // lists up orders of a User

// router.delete('/deleteOrder', catchAsync(Orders.deleteOrder)) // delete order

// router.post('/checkout', catchAsync(Orders.checkout)) // checkout your order for payment