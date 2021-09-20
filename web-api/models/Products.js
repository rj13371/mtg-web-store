const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productDescription: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    productCategory: {
        type: String,
        required: true
    },
    onSale: {
        type: Boolean
    },
    images: [{
        url: String
    }]
})

 // - _id: string
//   - productname: string
//   - stock:int
//   - price:int 
//   - productCatagory: string

module.exports = mongoose.model('Product', ProductSchema)