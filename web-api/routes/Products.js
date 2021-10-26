const express = require('express');
const router = express.Router({mergeParams:true});
const Products = require('../controllers/Products')



//returns func that catches errors in async functions
const catchAsync = func => {
    return (req,res,next) => {
        func(req,res,next).catch(e => next(e))
    }
   }

router.get('/productsAndMtgCards', catchAsync(Products.searchAllMtgCardsAndProducts))  
router.get('/productName/:productName', catchAsync(Products.searchProductsByName)) //SEARCH
router.post('/addproduct', catchAsync (Products.postProduct)) //ADD CARD


router.route('/:id')
.get(catchAsync (Products.getProductsById))

router.get('/catagory/:catagoryName', catchAsync (Products.getProductsByCatagoryName))

router.put('/:productId', catchAsync (Products.editProduct)) //ADD CARD
router.delete('/:productId',catchAsync (Products.deleteProduct))// 
module.exports = router;