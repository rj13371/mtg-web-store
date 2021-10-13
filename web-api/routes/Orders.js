const express = require('express');
const router = express.Router({mergeParams:true});
const Orders = require('../controllers/Orders');

const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
}
// TODO: Add authorization (approveOrder) and authentication (all) in React
router.post('/approveOrder', catchAsync(Orders.approveOrder)) // approve an order (Employees Authorization)

router.post('/createOrder', catchAsync(Orders.createOrder)) // create new order

router.put('/editOrder', catchAsync(Orders.editOrder)) // edit order

router.post('/showOrders', catchAsync(Orders.showOrders)) // lists up orders of a User

router.delete('/deleteOrder', catchAsync(Orders.deleteOrder)) // delete order

router.post('/checkout', catchAsync(Orders.checkout)) // checkout your order for payment

module.exports = router;
