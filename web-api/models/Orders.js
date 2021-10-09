const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    products: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],

    updatedAt:{type: Date, default: new Date()},
});

module.exports = mongoose.model('Order', OrderSchema)