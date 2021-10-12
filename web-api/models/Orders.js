const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO: add required properties
const OrderSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    products: [{
        type: Object,
        ref: 'Product',
        required: true
    }],

    updatedAt:{type: Date, default: new Date()},
});

module.exports = mongoose.model('Order', OrderSchema)