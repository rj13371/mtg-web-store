const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moment = require('moment');

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

    updatedAt:{type: String, default: moment().format("dddd, MMMM Do YYYY, h:mm:ss a") },

    isApproved:{type: Boolean, default: false },
    isComplete:{type: Boolean, default: false },
    total:{type: Number, default: 0 },
});

module.exports = mongoose.model('Order', OrderSchema)